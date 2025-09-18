import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { folderRoutes } from "./routes/folder.routes";
import { errorMiddleware } from "./middleware/error";
import { testDbConnection } from "./db";



async function bootstrap() {
  await testDbConnection();

  const app = new Elysia()
    .use(cors())
    .use(errorMiddleware)
    .use(folderRoutes)
    .get("/health", () => ({ status: "ok" }))
    .listen(3000);

  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
  );
}

bootstrap();