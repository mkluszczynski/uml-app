import { ReactiveClass } from "@lib/classes/ReactiveClass";
import { useEffect, useState, useRef } from "react";

export const useReactiveClass = (instance: ReactiveClass) => {
  const [, forceUpdate] = useState(0);
  const listenerRef = useRef<Function | null>(null);

  useEffect(() => {
    const newListener = () => {
      forceUpdate((prev) => prev + 1);
    };

    if (listenerRef.current) {
      instance.removeListener(listenerRef.current);
    }

    listenerRef.current = newListener;
    instance.addListener(newListener);

    return () => {
      instance.removeListener(newListener);
    };
  }, [instance]);

  return instance;
};
