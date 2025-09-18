import { FolderService } from "../service/folder.service";

export const FolderController = {
  create: ({ body }: any) => FolderService.create(body.name, body.parentId),
  getRoot: () => FolderService.getRoot(),
  getChildren: ({ params }: any) => FolderService.getChildren(Number(params.id)),
  getTree: ({ params }: any) => FolderService.getTree(Number(params.id)),
  update: ({ params, body }: any) =>
    FolderService.update(Number(params.id), body),
  delete: ({ params }: any) => FolderService.delete(Number(params.id)),
};
