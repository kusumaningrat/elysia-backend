import { prisma } from "../lib/prisma";

export const FolderRepository = {
  create: (data: { name: string; slug: string; path: string; parentId?: number | null }) =>
    prisma.folder.create({ data }),

  getRoot: () =>
    prisma.folder.findMany({ where: { parentId: null } }),

  getChildren: (parentId: number) =>
    prisma.folder.findMany({ where: { parentId } }),

  getById: (id: number) =>
    prisma.folder.findUnique({ where: { id }, include: { children: true } }),

  update: (id: number, data: { name?: string; parentId?: number }) =>
    prisma.folder.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.folder.delete({ where: { id } }),
};
