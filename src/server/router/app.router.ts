import { createRouter } from "../createRouter";
import { authRouter } from "./auth.router";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
  .merge("users.", userRouter)
  .merge("auth.", authRouter);
// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
