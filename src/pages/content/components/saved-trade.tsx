import { Edit, Trash } from "lucide-react";
import type { Trade } from "../use-items";

export const SavedTrade = ({ id, name, url, folderId }: Trade) => {
  return (
    <div className="flex border-border">
      <a href={url} className="flex-1 line-clamp-1">
        {name}
      </a>
      <button type="button">
        <Edit />
      </button>
      <button type="button">
        <Trash />
      </button>
    </div>
  );
};
