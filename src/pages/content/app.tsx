import { Save } from "lucide-react";

export const App = () => {
  return (
    <div className="fixed bottom-2 right-2 z-40 grid gap-2 bg-black text-primary-foreground p-2 border-border">
      <button
        className="p-2 text-secondary-foreground bg-secondary grid size-5"
        type="button"
      >
        <Save />
      </button>
      <button
        className="p-2 text-secondary-foreground bg-secondary grid size-5"
        type="button"
      >
        -
      </button>
    </div>
  );
};
