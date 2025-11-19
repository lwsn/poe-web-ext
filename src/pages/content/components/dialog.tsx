import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRef } from "react";
import { cn } from "../utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

const DialogPortal = (props: DialogPrimitive.DialogPortalProps) => {
  const rootEl = useRef(document.querySelector("#__root"));
  return <DialogPrimitive.Portal {...props} container={rootEl.current} />;
};

export const DialogContent = ({
  className,
  ...props
}: DialogPrimitive.DialogContentProps) => (
  <DialogPortal>
    <DialogPrimitive.Overlay
      onClick={(e) => e.stopPropagation()}
      className={cn("bg-black/50 fixed inset-0 z-1050", className)}
    />
    <DialogPrimitive.Content
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "fixed z-1051 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] grid gap-1.5 p-2 bg-black border-secondary border font-sans",
        className,
      )}
      {...props}
    />
  </DialogPortal>
);

export const DialogTitle = ({
  className,
  ...props
}: DialogPrimitive.DialogTitleProps) => (
  <DialogPrimitive.Title className={cn("", className)} {...props} />
);

export const DialogDescription = ({
  className,
  ...props
}: DialogPrimitive.DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={cn("text-seconary-foreground text-sm", className)}
    {...props}
  />
);
