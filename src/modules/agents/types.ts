import { inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "@/trpc/router/_app";

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];