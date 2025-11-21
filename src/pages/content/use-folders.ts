import { useStorage } from "@plasmohq/storage/hook";
import { useCallback, useMemo } from "react";
import { useItems } from "./use-items";

export type Folder = {
  id: string;
  name: string;
  expanded?: boolean;
};

export const useFolders = () => {
  const [value, setValue] = useStorage<Folder[]>("folders", (p) => p ?? []);
  const [, setDefaultFolder] = useStorage("defaultFolder");
  const { removeMany } = useItems();

  const add = useCallback(
    async (name: string) => {
      const id = Date.now().toString();
      await setValue((p = []) => [...p, { id, name }]);
      await setDefaultFolder(id);
      return id;
    },
    [setValue],
  );

  const edit = useCallback(
    (id: string, { name, expanded }: Partial<Omit<Folder, "id">>) =>
      setValue((p = []) =>
        p.map((v) =>
          v.id === id
            ? {
                id,
                name: name ?? v.name,
                expanded: expanded ?? v.expanded,
              }
            : v,
        ),
      ),
    [setValue],
  );

  const remove = useCallback(
    async (id: string) => {
      await setValue((p = []) => p.filter((v) => v.id !== id));
      return removeMany(id);
    },
    [setValue, removeMany],
  );

  return {
    value,
    add,
    edit,
    remove,
  };
};

export const useFolder = (id?: string) => {
  const folders = useFolders();

  const value = useMemo(
    () => folders.value?.find((v) => v.id === id),
    [folders.value, id],
  );

  const edit = useCallback(
    (args: Partial<Omit<Folder, "id">>) =>
      id ? folders.edit(id, args) : Promise.reject("No ID"),
    [id, folders.edit],
  );

  const remove = useCallback(
    () => (id ? folders.remove(id) : Promise.reject("No ID")),
    [id, folders.remove],
  );

  return {
    value,
    edit,
    remove,
    add: folders.add,
  };
};
