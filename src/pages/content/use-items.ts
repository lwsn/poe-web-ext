import { useStorage } from "@plasmohq/storage/hook";
import { useCallback, useMemo } from "react";

export type Trade = {
  id: string;
  folderId: string;
  url: string;
  name: string;
};

export const useItems = (folderId?: string) => {
  const [_value, setValue] = useStorage<Trade[]>("trades", (p) => p ?? []);

  const value = useMemo(
    () => (folderId ? _value.filter((v) => v.folderId === folderId) : _value),
    [_value, folderId],
  );

  const add = useCallback(
    ({ folderId, url, name }: Omit<Trade, "id">) => {
      const id = Date.now().toString();

      return setValue((p = []) => [...p, { folderId, url, name, id }]);
    },
    [setValue],
  );

  const edit = useCallback(
    (id: string, { folderId, url, name }: Partial<Omit<Trade, "id">>) =>
      setValue((p = []) =>
        p.map((v) =>
          v.id === id
            ? {
                id,
                folderId: folderId ?? v.folderId,
                url: url ?? v.url,
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
