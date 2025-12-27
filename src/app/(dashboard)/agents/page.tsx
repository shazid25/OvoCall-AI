import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { AgentsView, AgentsViewLoading } from "@/modules/agents/server/ui/views/agents-views";

const Page = async () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
           <Suspense 
           fallback={<AgentsViewLoading />}
           >
             <AgentsView />
           </Suspense>
        </HydrationBoundary>
    );
};

export default Page;