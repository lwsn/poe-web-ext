import { Edit, Save } from "lucide-react";
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
import { useItems, type Trade } from "../use-items";
import { useTradePath } from "../use-path";

export const SavedTrade = ({ id, name, param, folderId }: Trade) => {
  const path = useTradePath(param);
  const { remove, edit } = useItems();

  const [rename, setRename] = useState(name);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center border-border gap-1">
      <a
        href={path.tradePath}
        className={cn(
          buttonVariants({ variant: "secondary", size: "sm" }),
          "flex-1 line-clamp-1 text-start justify-start bg-secondary! hover:bg-secondary-hover!",
        )}
      >
        {name}
      </a>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            type="button"
            size="sm"
            variant="secondary"
          >
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Edit saved trade</DialogTitle>
          <div className="flex gap-1 min-w-sm">
            <Input
              value={rename}
              onChange={(e) => setRename(e.target.value)}
              placeholder="Edit trade name..."
            />
            <Button
              disabled={!rename}
              onClick={() =>
                edit(id, { name: rename }).then(() => setIsOpen(false))
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
              onClick={() => remove(id).then(() => setIsOpen(false))}
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
  );
};
