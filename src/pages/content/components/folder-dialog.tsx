import { useFolder } from "../use-folders";
import * as Dialog from "@radix-ui/react-dialog";

export const FolderDialog = ({
  id,
  open,
  setOpen,
}: {
  id?: string;
  open?: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { edit, remove, add } = useFolder(id);

  const isCreating = !id;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>
            {isCreating ? "Create folder" : "Edit folder"}
          </Dialog.Title>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
