import { FolderRepository } from "../repository/folder.repository";

export const FolderService = {
    async create(name: string, parentId?: number) {
    let parentPath = "";
    if (parentId) {
      const parent = await FolderRepository.getById(parentId);
      if (!parent) throw new Error("NOT_FOUND: Parent folder not found");
      parentPath = parent.path.replace(/\/+$/, "");
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    return FolderRepository.create({
      name,
      parentId: parentId ?? null,
      slug,
      path: parentPath ? `${parentPath}/${slug}` : `/${slug}`,
    });
  },

  getRoot: () => FolderRepository.getRoot(),

  getChildren: (id: number) => FolderRepository.getChildren(id),

  async getTree(id: number) {
    async function buildTree(id: number): Promise<any | null> {
      const folder = await FolderRepository.getById(id);
      if (!folder) return null;

      const children = (
        await Promise.all(folder.children.map(child => buildTree(child.id)))
      ).filter(Boolean);

      return { ...folder, children };
    }

    return buildTree(id);
  },

  update: (id: number, data: { name?: string; parentId?: number }) =>
    FolderRepository.update(id, data),

  delete: (id: number) => FolderRepository.delete(id),
}