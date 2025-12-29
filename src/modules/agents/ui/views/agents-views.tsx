"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns, Payment } from "../components/columns";


const mockData: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    return (
        <div>
           <DataTable data={mockData} columns={columns} />
         </div>
    );
};

export const AgentsViewLoading = () =>{
    return(
        <LoadingState
        title="Loading Agents"
        description="This may take a few seconds..."
        />

       
    )
}


export const AgentsViewError = () =>{
    return(
         <ErrorState
                    title="Error Loading Agents"
                    description="Something went wrong while loading your AI agents. Please try again."
                   
                />
    )
}
