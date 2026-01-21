// // import { useState } from "react";
// // import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
// // import { CallLobby } from "./call-lobby";
// // import { CallActive } from "./call-active";
// // import { CallEnded } from "./call-ended";

// // interface Props {
// //   meetingName: string;
// // }

// // export const CallUI = ({ meetingName }: Props) => {
// //   const call = useCall();
// //   const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

// //   const handleJoin = async () => {
// //     if (!call) return;

// //     await call.join();
// //     setShow("call");
// //   };

// //   const handleLeave = () => {
// //     if (!call) return;

// //     call.endCall();
// //     setShow("ended");
// //   };

// //   return (
// //     <StreamTheme className="h-full">
// //       {show === "lobby" && <CallLobby onJoin={handleJoin} /> }
// //       {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
// //       {show === "ended" && <CallEnded />}
// //     </StreamTheme>
// //   );
// // };




// "use client";

// import { useState, useEffect, useRef } from "react";
// import { StreamTheme, useCall, StreamCall } from "@stream-io/video-react-sdk";
// import { CallLobby } from "./call-lobby";
// import { CallActive } from "./call-active";
// import { CallEnded } from "./call-ended";
// import { ErrorState } from "@/components/error-state";
// import { LoadingState } from "@/components/loading-state";

// interface Props {
//   meetingName: string;
// }

// export const CallUI = ({ meetingName }: Props) => {
//   const call = useCall();
//   const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
//   const [isJoining, setIsJoining] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const hasJoinedRef = useRef(false); // Track if we've already joined

//   const handleJoin = async () => {
//     if (!call) {
//       setError("Call not initialized");
//       return;
//     }

//     // Prevent multiple join attempts
//     if (isJoining || hasJoinedRef.current) {
//       return;
//     }

//     // Check if already joined
//     if (call.state.joined || call.state.joining) {
//       setShow("call");
//       return;
//     }

//     setIsJoining(true);
//     setError(null);

//     try {
//       // Mark that we're attempting to join
//       hasJoinedRef.current = true;
      
//       await call.join({
//         create: true,
//         data: {
//           custom: {
//             meetingName,
//             startedAt: new Date().toISOString(),
//           },
//         },
//       });
      
//       setShow("call");
//     } catch (err) {
//       console.error("Failed to join call:", err);
//       setError("Failed to join the call. Please try again.");
      
//       // Reset join flag on error so we can retry
//       hasJoinedRef.current = false;
      
//       // Optional: show error state or return to lobby
//       setShow("lobby");
//     } finally {
//       setIsJoining(false);
//     }
//   };

//   const handleLeave = () => {
//     if (!call) return;

//     try {
//       call.leave().catch(console.error);
//       setShow("ended");
//       // Reset the join flag when leaving
//       hasJoinedRef.current = false;
//     } catch (err) {
//       console.error("Error leaving call:", err);
//     }
//   };

//   // Reset join flag when component unmounts
//   useEffect(() => {
//     return () => {
//       if (call && call.state.joined) {
//         call.leave().catch(console.error);
//       }
//       hasJoinedRef.current = false;
//     };
//   }, [call]);

//   // Listen for call state changes
//   useEffect(() => {
//     if (!call) return;

//     const handleCallJoined = () => {
//       setShow("call");
//       setIsJoining(false);
//     };

//     const handleCallLeft = () => {
//       setShow("ended");
//       hasJoinedRef.current = false;
//     };

//     call.on("call.joined", handleCallJoined);
//     call.on("call.left", handleCallLeft);

//     return () => {
//       call.off("call.joined", handleCallJoined);
//       call.off("call.left", handleCallLeft);
//     };
//   }, [call]);

//   if (error) {
//     return (
//       <div className="h-full flex items-center justify-center p-4">
//         <ErrorState
//           title="Call Error"
//           description={error}
//           onRetry={() => {
//             setError(null);
//             hasJoinedRef.current = false;
//           }}
//         />
//       </div>
//     );
//   }

//   return (
//     <StreamTheme className="h-full">
//       <StreamCall call={call}>
//         {show === "lobby" && (
//           <CallLobby 
//             onJoin={handleJoin} 
//             isJoining={isJoining}
//             meetingName={meetingName}
//           />
//         )}
//         {show === "call" && call && (
//           <CallActive 
//             onLeave={handleLeave} 
//             meetingName={meetingName}
//           />
//         )}
//         {show === "ended" && <CallEnded />}
//       </StreamCall>
//     </StreamTheme>
//   );
// };




import { useState, useEffect } from "react";
import { StreamTheme, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
  const [isJoining, setIsJoining] = useState(false);

  // Sync the UI view with the actual call state
  useEffect(() => {
    if (callingState === "joined") {
      setShow("call");
      setIsJoining(false);
    } else if (callingState === "left") {
      setShow("ended");
    }
  }, [callingState]);

  const handleJoin = async () => {
    if (!call || isJoining) return;
    
    // Safety: If already joined or joining, don't call join() again
    if (callingState !== "idle") {
        if (callingState === "joined") setShow("call");
        return;
    }

    try {
      setIsJoining(true);
      await call.join();
      // setShow("call") is handled by the useEffect above safely
    } catch (error: any) {
      setIsJoining(false);
      // Ignore the specific "already called" error to prevent crash
      if (!error.message.includes("shall be called only once")) {
        console.error("Failed to join call:", error);
      } else {
        setShow("call"); // Fallback: if it thinks it joined, try to show the call
      }
    }
  };

  const handleLeave = async () => {
    if (!call) return;
    await call.endCall();
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && (
        <CallLobby onJoin={handleJoin} isJoining={isJoining} />
      )}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};