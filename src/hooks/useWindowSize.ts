import { useState, useEffect } from "react";

export const VIEWPORT_BREAKPOINT = 768;
export const MIN_LANDSCAPE_WIDTH = `(min-width:${VIEWPORT_BREAKPOINT}px)`;

export const VIEWPORT_BREAKPOINT_TABLET = 1280;
export const MIN_DESCTOP_WIDTH = `(min-width:${VIEWPORT_BREAKPOINT_TABLET}px)`;

export const ORIENTATION = {
  LANDSCAPE: "LANDSCAPE",
  PORTRAIT: "PORTRAIT",
} as const;

export type TypeofOrientation = keyof typeof ORIENTATION;

export interface TypeofInnerSize {
  width: number;
  height: number;
}

export function useInnerSize(): TypeofInnerSize {
  const [windowSize, setWindowSize] = useState<TypeofInnerSize>(
    getDocumentWidth()
  );

  const handleResize = () => {
    setWindowSize(getDocumentWidth());
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (
    typeof window === "undefined" ||
    typeof document?.documentElement === "undefined"
  ) {
    return {
      width: 0,
      height: 0,
    };
  }

  return windowSize;
}

const getDocumentWidth = () => {
  const width = Math.min(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const height = Math.min(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  return { width, height };
};

export const useOrientation = (): TypeofOrientation => {
  const windowSize: TypeofInnerSize = useInnerSize();
  return windowSize.width >= VIEWPORT_BREAKPOINT
    ? ORIENTATION.LANDSCAPE
    : ORIENTATION.PORTRAIT;
};

export const useIsLandscape = (): boolean => {
  const orientation = useOrientation();
  return orientation === ORIENTATION.LANDSCAPE;
};

export const useIsTabletSize = () => {
  const windowSize: TypeofInnerSize = useInnerSize();
  return (
    windowSize.width >= VIEWPORT_BREAKPOINT &&
    windowSize.width < VIEWPORT_BREAKPOINT_TABLET
  );
};
