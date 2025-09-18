import { t, Elysia } from "elysia";
import { FolderController } from "../controllers/folder.controller";

export const folderRoutes = (app: Elysia) =>
  app.group("/folders", app =>
    app
      .post("/", FolderController.create, {
        body: t.Object({
          name: t.String(),
          parentId: t.Optional(t.Numeric()),
        }),
      })
      .get("/", FolderController.getRoot)
      .get("/:id/children", FolderController.getChildren, {
        params: t.Object({ id: t.Numeric() }),
      })
      .get("/:id/tree", FolderController.getTree, {
        params: t.Object({ id: t.Numeric() }),
      })
      .put("/:id", FolderController.update, {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
          name: t.Optional(t.String()),
          parentId: t.Optional(t.Numeric()),
        }),
      })
      .delete("/:id", FolderController.delete, {
        params: t.Object({ id: t.Numeric() }),
      })
  );
