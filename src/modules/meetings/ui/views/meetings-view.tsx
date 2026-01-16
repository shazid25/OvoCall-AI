// "use client";

// import { useSuspenseQuery } from "@tanstack/react-query";
// import { useTRPC } from "@/trpc/client";
// import { LoadingState } from "@/components/loading-state";
// import { ErrorState } from "@/components/error-state";

// export const MeetingsView = () => {
//     const trpc = useTRPC();
//     const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

//     return (
//         <div>
//             {JSON.stringify(data)}
//         </div>
//     );
// };


// export const MeetingsViewLoading = () =>{
//     return(
//         <LoadingState
//         title="Loading Meetings"
//         description="This may take a few seconds..."
//         />

       
//     )
// }


// export const MeetingsViewError = () =>{
//     return(
//          <ErrorState
//                     title="Error Loading Meetings"
//                     description="Something went wrong"
//                     />
                
//     )
// }






"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(
        (trpc.meetings as any).getMany?.queryOptions({}) || {
            queryKey: ['meetings', 'getMany', {}],
            queryFn: () => Promise.resolve([]),
        }
    );

    return (
        <div>
           //ToDo: Data Table 
        </div>
    );
};

export const MeetingsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meetings"
            description="Fetching your meeting history..."
        />
    );
};

export const MeetingsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Meetings"
            description="Unable to load your meetings. Please try again later."
        />
    );
};