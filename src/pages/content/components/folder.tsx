import { useFolder, type Folder as FolderType } from "../use-folders";
import { useItems } from "../use-items";
import { SavedTrade } from "./saved-trade";
import { BookmarkPlus, ChevronDown, Edit, Save, Trash } from "lucide-react";
import { cn, getTradeParam } from "../utils";
import { Button, buttonVariants } from "./button";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./dialog";
import { Input } from "./input";
import { DeleteButton } from "./delete-button";

export const Folder = ({ id, name, expanded }: FolderType) => {
  const { edit, remove } = useFolder(id);
  const { value, add } = useItems(id);

  const [rename, setRename] = useState(name);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid border border-main-border bg-black">
      <button
        type="button"
        onClick={() => edit({ expanded: !expanded })}
        className={cn(buttonVariants(), "text-left border-0 justify-between")}
      >
        <div className="flex-1">
          {name} ({value?.length})
        </div>
        <ChevronDown className={expanded ? "rotate-180" : ""} />
      </button>
      {expanded && (
        <div className="grid gap-1.5 p-1">
          {value.map((v) => (
            <SavedTrade key={v.id} {...v} />
          ))}
          <div className="flex gap-1">
            <Button
              className="flex-1"
              onClick={() => {
                const param = getTradeParam();
                if (!param) return;
                add({
                  folderId: id,
                  name: "New Saved Trade",
                  param,
                });
              }}
            >
              Save Trade
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                  }}
                  className="flex-1"
                  type="button"
                >
                  Edit Folder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Edit folder</DialogTitle>
                <div className="flex gap-1 min-w-sm">
                  <Input
                    value={rename}
                    onChange={(e) => setRename(e.target.value)}
                    placeholder="Enter folder name..."
                  />
                  <Button
                    disabled={!rename}
                    onClick={() =>
                      edit({ name: rename }).then(() => setIsOpen(false))
                    }
                    variant="default"
                  >
                    <Save />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-1 w-full">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setRename(name);
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <DeleteButton
                    onClick={() => remove().then(() => setIsOpen(false))}
                  >
                    Delete
                  </DeleteButton>
                </div>
                <DialogDescription hidden>
                  Edit folder name, or delete it
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};
