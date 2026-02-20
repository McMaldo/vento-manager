import type React from "react";
import { useEffect, useRef, useState } from "react";

interface ExpandMessageProps {
  message: string | null | undefined;
  className?: string;
  isOpened?: boolean;
}
const ExpandMessage: React.FC<ExpandMessageProps> = ({
  message = "Mensaje",
  className = "",
  isOpened = false,
}) => {
  const textContainer = useRef<HTMLDivElement>(null);
  const [textContainerHeight, setTextContainerHeight] = useState(0);

  useEffect(() => {
    if (textContainer.current) {
      setTextContainerHeight(textContainer.current.scrollHeight);
    }
  }, []);

  return (
    <div
      className="transition-all ease overflow-hidden"
      style={{
        height: isOpened ? textContainerHeight : 0,
      }}
    >
      <div ref={textContainer} className={"text-nowrap " + className}>
        {message}
      </div>
    </div>
  );
};
export default ExpandMessage;
