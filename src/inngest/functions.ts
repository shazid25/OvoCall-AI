// import JSONL from "jsonl-parse-stringify";
// import { inngest } from "@/inngest/client";
// import { StreamTranscriptItem } from "@/modules/meetings/types";


// export const meetingsProcessing = inngest.createFunction(
//   { id: "meetings/processing" },
//   { event: "meetings/processing" },
//   async ({ event, step }) => {
//     const response = await step.run("fetch-transcript", async () => {
//       return fetch(event.data.transcriptUrl).then((res) => res.text());
//     });

//     const transcript = await step.run("parse-transcript", async () => {
//       return JSONL.parse<StreamTranscriptItem>(response);
//     });

// //add everything there

//   },
// );










import JSONL from "jsonl-parse-stringify";
import { inngest } from "@/inngest/client";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import { db } from "@/db";
import { user, agents, meetings } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { createAgent, openai, TextMessage } from "@inngest/agent-kit";
import { eq } from "drizzle-orm";


const summarizer = createAgent({
  name: "summarizer",
  system: `
  You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

Use the following markdown structure for every output:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

### Notes
Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

Example:
#### Section Name
- Main point or demo shown here
- Another key insight or interaction
- Follow-up tool or explanation provided

#### Next Section
- Feature X automatically does Y
- Mention of integration with Z

  `.trim(),
  model: openai({ model: "gpt-4o", apiKey: process.env.OPENAI_API_KEY }),
})

export const meetingsProcessing = inngest.createFunction(
  { id: "meetings/processing" },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    const response = await step.run("fetch-transcript", async () => {
      return fetch(event.data.transcriptUrl).then((res) => res.text());
    });

    const transcript = await step.run("parse-transcript", async () => {
      return JSONL.parse<StreamTranscriptItem>(response);
    });

    const transcriptWithSpeakers = await step.run("add-speakers", async () => {
      // 1. Get unique speaker IDs from the transcript
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];

      // 2. Fetch users that match these IDs
      const userSpeakers = await db
        .select()
        .from(user)
        .where(inArray(user.id, speakerIds))
        .then((users) =>
          users.map((u) => ({
            ...u,
          }))
        );

      // 3. Fetch agents that match these IDs
      const agentSpeakers = await db
        .select()
        .from(agents)
        .where(inArray(agents.id, speakerIds))
        .then((res) =>
          res.map((agent) => ({
            ...agent,
          }))
        );

      // 4. Combine all potential speakers
      const speakers = [...userSpeakers, ...agentSpeakers];

      // 5. Map through transcript and attach speaker names
      return transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id
        );

        if (!speaker) {
          return {
            ...item,
            user: {
              name: "Unknown",
            },
          };
        }

        return {
          ...item,
          user: {
            name: speaker.name,
          },
        };
      });
    });

    const { output } = await summarizer.run(
      "Summarize the following transcript: " +
      JSON.stringify(transcriptWithSpeakers)
    );

    // 2. Save the summary to the database
    await step.run("save-summary", async () => {
      await db
        .update(meetings)
        .set({
          summary: (output[0] as TextMessage).content as string,
          status: "completed",
        })
        .where(eq(meetings.id, event.data.meetingId));
    });
  }
);