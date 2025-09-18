import type { Elysia } from "elysia";

export const errorMiddleware = (app: Elysia) =>
  app.onError(({ code, error, set }) => {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
    ) {
      const [tag, ...rest] = (error as { message: string }).message.split(":");
      const msg = rest.join(":").trim() || "Unexpected error";
      if (tag === "BAD_REQUEST") { set.status = 400; return { error: msg }; }
      if (tag === "NOT_FOUND") { set.status = 404; return { error: msg }; }
    }
    if (code === "NOT_FOUND") { set.status = 404; return { error: "Route not found" }; }
    set.status = 500;
    return { error: "Internal Server Error" };
  });
