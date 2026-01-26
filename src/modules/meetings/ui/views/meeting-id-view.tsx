// 'use client';

// import { ErrorState } from "@/components/error-state";
// import { LoadingState } from "@/components/loading-state";
// import { useTRPC } from "@/trpc/client";
// import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
// import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
// import { useRouter } from "next/navigation";
// import { useConfirm } from "@/hooks/use-confirm";
// import { UpdateMeetingDialog } from "../components/update-meeting-dialog copy";
// import { useState } from "react";
// import { UpcomingState } from "../components/upcoming-state";
// import { ActiveState } from "../components/active-state";
// import { CancelState } from "../components/cancel-state";
// import { ProcessingState } from "@/components/processing-state";
// import { CompletedState } from "../components/completed-state";

// interface Props {
//   meetingId: string;
// };

// export const MeetingIdView = async ({ meetingId }: Props) => {

//     const trpc = useTRPC();
//     const router = useRouter();
//     const queryClient = useQueryClient();

//     const [ updateMeetingDialogOpen, setUpdateMeetingDialogOpen ] = useState(false)

//     const [ RemoveConfirmation, confirmRemove ] = useConfirm(
//         "Are you sure?",
//         "The following action will remove this meeting"
//     )

//     const { data } = useSuspenseQuery(
//         trpc.meetings.getOne.queryOptions({ id: meetingId }),
//     );

//     const removeMeeting = useMutation(
//         trpc.meetings.remove.mutationOptions({
//         onSuccess: () => {
//             queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
//             //TODO: Invalidate free trial usage
//             router.push('/meetings');
//         },
       
//         }),
//  );

//  const handleRemoveMeeting = async() =>{

//   const ok = await confirmRemove();

//   if(ok!) return;

//   await removeMeeting.mutateAsync({id:meetingId});
//  }


//  const isActive = data.status === "active";
//  const isUpcoming = data.status === "upcoming";
//  const isCanceled = data.status === "canceled";
//  const isCompleted = data.status === "completed";
//  const isProcessing = data.status === "processing";



    
//     return (
//         <>

//         <RemoveConfirmation />
//         <UpdateMeetingDialog
//         open ={updateMeetingDialogOpen}
//         onOpenChange={setUpdateMeetingDialogOpen}
//         initialValues={data}

//         />
//         <div className=" flex flex-col gap-y-4 md:px-8 py-4 px-4 ">

//             <MeetingIdViewHeader 
//                 meetingId={meetingId}
//                 meetingName={data.name}
//                 onEdit={() => setUpdateMeetingDialogOpen(true)}
//                 onRemove={handleRemoveMeeting}
//             />
//           { isCanceled && <CancelState /> }
//           { isProcessing && <ProcessingState /> }
//           { isCompleted && <CompletedState data={data} /> }
//           { isActive && <ActiveState meetingId={meetingId} /> }
//           { isUpcoming && (
            
//           <UpcomingState
//           meetingId={meetingId}
//           onCancelMeeting={()=>{}}
//           isCancelling={false}
//           />
          
//           ) }

//         </div>
//         </>
//     );
// };



// export const MeetingIdViewLoading = () => {
//   return (
//     <LoadingState
//       title="Loading Meeting"
//       description="This may take a few seconds"
//     />
//   );
// };

// export const MeetingIdViewError = () => {
//   return (
//     <ErrorState
//       title="Error Loading Meeting"
//       description="Please try again later"
//     />
//   );
// };



'use client';

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog copy";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelState } from "../components/cancel-state";
import { ProcessingState } from "@/components/processing-state";
import { CompletedState } from "../components/completed-state";

interface Props {
  meetingId: string;
};

export const MeetingIdView = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        "The following action will remove this meeting"
    );

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId }),
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                //TODO: Invalidate free trial usage
                router.push('/meetings');
            },
        }),
    );

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove();
        if (!ok) return;
        await removeMeeting.mutateAsync({ id: meetingId });
    };

    const handleCancelMeeting = async () => {
        setIsCancelling(true);
        try {
            // TODO: Implement cancel meeting mutation
            // await trpc.meetings.cancel.mutateAsync({ id: meetingId });
            // For now, just log and show success
            console.log("Cancel meeting", meetingId);
            // Refresh the data
            await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: meetingId }));
        } catch (error) {
            console.error("Failed to cancel meeting:", error);
        } finally {
            setIsCancelling(false);
        }
    };

    const isActive = data.status === "active";
    const isUpcoming = data.status === "upcoming";
    const isCanceled = data.status === "canceled";
    const isCompleted = data.status === "completed";
    const isProcessing = data.status === "processing";

    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data}
            />
            <div className="flex flex-col gap-y-4 md:px-8 py-4 px-4">
                <MeetingIdViewHeader 
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                />
                {isCanceled && <CancelState />}
                {isProcessing && <ProcessingState />}
                {isCompleted && <CompletedState data={data} />}
                {isActive && (
                    <ActiveState 
                        meetingId={meetingId}
                        onCancelMeeting={handleCancelMeeting}
                        isCancelling={isCancelling}
                    />
                )}
                {isUpcoming && (
                    <UpcomingState
                        meetingId={meetingId}
                        onCancelMeeting={handleCancelMeeting}
                        isCancelling={isCancelling}
                    />
                )}
            </div>
        </>
    );
};

export const MeetingIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meeting"
            description="This may take a few seconds"
        />
    );
};

export const MeetingIdViewError = () => {
    return (
        <ErrorState
            title="Error Loading Meeting"
            description="Please try again later"
        />
    );
};