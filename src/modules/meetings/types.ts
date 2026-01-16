import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/trpc/router/_app";

export type MeetingGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"];