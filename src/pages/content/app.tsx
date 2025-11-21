import { ChevronsLeft, Save } from "lucide-react";
import { cn } from "./utils";
import { useFolders } from "./use-folders";
import { Folder } from "./components/folder";
import { Button } from "./components/button";
import { NewFolder } from "./components/new-folder";
import { useStorage } from "@plasmohq/storage/hook";
import { PathProvider, usePath } from "./use-path";
import { useItems } from "./use-items";

const QuickSaveButton = () => {
  const { value: folders, add } = useFolders();
  const [defaultFolder, setDefaultFolder] = useStorage("defaultFolder");
  const { add: addItem } = useItems();
  const { tradeString, history } = usePath();

  const name = history?.name || "Quick Saved Trade";

  return (
    <Button
      onClick={async () => {
        if (!tradeString) return;
        let folderId: string | undefined;
        if (defaultFolder && folders?.some((f) => f.id === defaultFolder))
          folderId = defaultFolder;
        else if (folders?.length) folderId = folders[0].id;
        else {
          folderId = await add("Default Folder");
          setDefaultFolder(folderId);
        }

        if (!folderId) return;

        addItem({
          param: tradeString,
          folderId,
          name,
        });
      }}
      type="button"
    >
      <Save />
    </Button>
  );
};

export const App = () => {
  const { value: folders } = useFolders();
  const [isExpanded, setIsExpanded] = useStorage("isExpanded", false);
  return (
    <PathProvider>
      <div
        className={cn(
          "z-1001 transition-all fixed md:relative",
          isExpanded ? "w-md ml-1.5" : "w-0",
        )}
      >
        <div
          className={cn(
            "fixed top-0 right-0 pt-1.5 pr-1.5 z-1001 flex flex-col justify-between gap-2 font-sans text-main-foreground",
            isExpanded &&
              "w-md bottom-0 bg-black/90 border-l border-secondary p-1.5",
          )}
        >
          <div className="flex gap-1 justify-between">
            <div className="flex gap-1">
              <QuickSaveButton />
              {isExpanded && <NewFolder />}
            </div>
            <Button type="button" onClick={() => setIsExpanded((p) => !p)}>
              <ChevronsLeft className={isExpanded ? "rotate-180" : ""} />
            </Button>
          </div>
          {isExpanded && (
            <>
              <h3 className="mt-2!">Saved trades</h3>
              <div className="relative grid gap-1.5 overflow-y-auto mb-auto w-full items-start">
                {folders?.map((f) => (
                  <Folder key={f.id} {...f} />
                ))}
                {!folders?.length && (
                  <div className="text-center p-1">No saved trades found</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </PathProvider>
  );
};
