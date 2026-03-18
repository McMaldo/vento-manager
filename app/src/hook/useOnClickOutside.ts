import { useEffect, useRef } from "react";

const useOnClickOutside = <T extends HTMLElement>(
  handler: (e: Event) => void,
) => {
  const ref = useRef<T>(null); // Create a ref to attach to the component

  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendant elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event); // Call the handler function if the click is outside
    };

    // Attach the event listener to the document
    // 'mousedown' or 'click' can be used depending on desired behavior
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener); // Also listen for touch events

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Re-run effect if ref or handler changes

  return ref; // Return the ref to be used in the component
};

export default useOnClickOutside;
