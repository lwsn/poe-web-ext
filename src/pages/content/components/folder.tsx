import { useFolder, type Folder as FolderType } from "../use-folders";
import { useItems } from "../use-items";
import { SavedTrade } from "./saved-trade";
import { BookmarkPlus, Edit, Save, Trash } from "lucide-react";
import { cn } from "../utils";
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
  const { value } = useItems(id);

  const [rename, setRename] = useState(name);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid border border-main-border bg-black">
      <button
        type="button"
        onClick={() => edit({ expanded: !expanded })}
        className={cn(
          buttonVariants(),
          "text-left border-0 justify-between min-w-sm",
        )}
      >
        <div className="flex-1">
          {name} ({value?.length})
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
              className="p-1"
              type="button"
            >
              <Edit size={16} />
            </button>
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
              <Button variant="ghost">Cancel</Button>
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
      </button>
      {expanded && (
        <div className="grid p-1">
          {value.map((v) => (
            <SavedTrade key={v.id} {...v} />
          ))}
          <Button>
            <BookmarkPlus />
          </Button>
        </div>
      )}
    </div>
  );
};
