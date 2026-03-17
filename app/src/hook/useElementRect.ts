import { useEffect, useState, type RefObject } from "react";

const useElementRect = (ref: RefObject<HTMLElement | null>) => {
  const [rect, setRect] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const { top, left, width, height } =
          ref.current.getBoundingClientRect();
        setRect({ top, left, width, height });
      }
    };

    update(); // valor inicial
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [ref]);

  return rect;
};

export default useElementRect;
