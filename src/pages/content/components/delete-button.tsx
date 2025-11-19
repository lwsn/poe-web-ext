import { MouseEventHandler, SyntheticEvent, useRef, useState } from "react";
import { Button, ButtonProps } from "./button";

export const DeleteButton = ({
  maxConfirmTimeout = 5,
  step = 100,
  onClick,
  children,
  ...props
}: ButtonProps & {
  maxConfirmTimeout?: number;
  step?: number;
}) => {
  const [confirmTimeout, setConfirmTimeout] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (timeoutRef.current) {
      onClick?.(e);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setConfirmTimeout(0);
    } else {
      const endTime = Date.now() + maxConfirmTimeout * 1000;
      const countdown = () => {
        let currentTimeout = Math.ceil((endTime - Date.now()) / 1000);
        currentTimeout = Math.max(0, currentTimeout);

        setConfirmTimeout(currentTimeout);
        if (currentTimeout > 0)
          timeoutRef.current = setTimeout(countdown, step);
        else timeoutRef.current = null;
      };

      countdown();
    }
  };

  if (confirmTimeout)
    return (
      <Button {...props} onClick={handleClick} variant="destructive">
        Confirm ({confirmTimeout})
      </Button>
    );

  return (
    <Button {...props} onClick={handleClick} variant="destructive">
      {children}
    </Button>
  );
};
