

// "use client";

// import { useSuspenseQuery } from "@tanstack/react-query";
// import { useTRPC } from "@/trpc/client";
// import { LoadingState } from "@/components/loading-state";
// import { ErrorState } from "@/components/error-state";
// import { DataTable } from "@/components/data-table";
// import { columns } from "../components/columns";

// export const MeetingsView = () => {
//     const trpc = useTRPC();
//     const { data } = useSuspenseQuery(
//         (trpc.meetings as any).getMany?.queryOptions({}) || {
//             queryKey: ['meetings', 'getMany', {}],
//             queryFn: () => Promise.resolve([]),
//         }
//     );

//     return (
//         <div className="flex-1 pb-4 md:px-8 flex flex-col gap-y-4">
//          <DataTable data={data.items} columns={columns}  />
//         </div>
//     );
// };

// export const MeetingsViewLoading = () => {
//     return (
//         <LoadingState
//             title="Loading Meetings"
//             description="Fetching your meeting history..."
//         />
//     );
// };

// export const MeetingsViewError = () => {
//     return (
//         <ErrorState
//             title="Error Loading Meetings"
//             description="Unable to load your meetings. Please try again later."
//         />
//     );
// };










"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {
    const trpc = useTRPC();

    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

    return (
        <div className="flex-1 pb-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data.items} columns={columns} />

            {data.items.length === 0 && (
                <EmptyState
                    title="Create your first meeting"
                    description="You have not created any meetings yet. Start by scheduling a new meeting."
                />
            )
            }

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