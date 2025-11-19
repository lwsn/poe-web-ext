import { ChevronsLeft, FolderPlus, Save } from "lucide-react";
import { cn, getLeagues } from "./utils";
import { useFolders } from "./use-folders";
import { Folder } from "./components/folder";
import { useState } from "react";
import { Button } from "./components/button";
import { NewFolder } from "./components/new-folder";

export const App = () => {
  const { value: folders, add } = useFolders();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 pb-1.5 pr-1.5 z-1000 flex flex-col justify-between gap-2 font-sans text-main-foreground",
        isExpanded && "top-0 bg-black/90 border-l border-secondary p-1.5",
      )}
    >
      {isExpanded && (
        <div className="grid gap-1.5 overflow-y-auto">
          {folders?.map((f) => (
            <Folder key={f.id} {...f} />
          ))}
          {!folders?.length && (
            <div className="min-w-sm text-center p-1">
              No saved trades found
            </div>
          )}
        </div>
      )}
      <div className="flex gap-1 justify-between">
        <div className="flex gap-1">
          <Button type="button">
            <Save />
          </Button>
          {isExpanded && <NewFolder />}
        </div>
        <Button type="button" onClick={() => setIsExpanded((p) => !p)}>
          <ChevronsLeft className={isExpanded ? "rotate-180" : ""} />
        </Button>
      </div>
    </div>
  );
};
