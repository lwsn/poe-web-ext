import { cn } from "../utils";

export const Input = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      className={cn(
        "bg-[#1e2124] p-1.5 border border-[#1e2124] focus:border-[#777] text-center outline-none text-white! w-full",
        className,
      )}
      {...props}
    />
  );
};
