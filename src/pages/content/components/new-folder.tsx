import { useFolders } from "../use-folders";
import { useState } from "react";
import { Input } from "./input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./dialog";
import { FolderPlus, Save } from "lucide-react";
import { Button } from "./button";

export const NewFolder = () => {
  const { add } = useFolders();
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          type="button"
        >
          <FolderPlus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Folder</DialogTitle>
        <div className="flex gap-1 min-w-sm">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter folder name..."
          />
        </div>
        <div className="grid grid-cols-2 gap-1 w-full">
          <Button
            disabled={!name}
            onClick={() => add(name).then(() => setIsOpen(false))}
            variant="default"
          >
            Create
          </Button>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
        <DialogDescription hidden>Create a new folder</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
