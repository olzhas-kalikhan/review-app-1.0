import { createRouter } from "../createRouter";
import { userRouter } from "./user.router";

export const appRouter = createRouter().merge("users.", userRouter);
// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
