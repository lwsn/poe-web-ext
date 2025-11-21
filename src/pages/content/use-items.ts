import { useStorage } from "@plasmohq/storage/hook";
import { useCallback, useMemo } from "react";

export type Trade = {
  id: string;
  folderId: string;
  param: string;
  name: string;
};

export const useItems = (folderId?: string) => {
  const [_value, setValue] = useStorage<Trade[]>("trades", (p) => p ?? []);
  const [, setDefaultFolder] = useStorage("defaultFolder");

  const value = useMemo(
    () => (folderId ? _value.filter((v) => v.folderId === folderId) : _value),
    [_value, folderId],
  );

  const add = useCallback(
    async ({ folderId, param, name }: Omit<Trade, "id">) => {
      const id = Date.now().toString();

      await setValue((p = []) => [...p, { folderId, param, name, id }]);
      await setDefaultFolder(folderId);
      return id;
    },
    [setValue, setDefaultFolder],
  );

  const edit = useCallback(
    (id: string, { folderId, param, name }: Partial<Omit<Trade, "id">>) =>
      setValue((p = []) =>
        p.map((v) =>
          v.id === id
            ? {
                id,
                folderId: folderId ?? v.folderId,
                param: param ?? v.param,
                name: name ?? v.name,
              }
            : v,
        ),
      ),
    [setValue],
  );

  const remove = useCallback(
    (id: string) => setValue((p = []) => p.filter((v) => v.id !== id)),
    [setValue],
  );

  const removeMany = useCallback(
    (id: string) => setValue((p = []) => p.filter((v) => v.folderId !== id)),
    [setValue],
  );

  return {
    value,
    add,
    edit,
    remove,
    removeMany,
  };
};
