import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function usePreviousPath() {
  const location = useLocation();
  const prevPathRef = useRef < string | null > (null);
  const currentPathRef = useRef(location.pathname);

  useEffect(() => {
    prevPathRef.current = currentPathRef.current;
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  return prevPathRef.current;
}
