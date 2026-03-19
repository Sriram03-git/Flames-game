import type * as React from "react";

declare module "framer-motion" {
  export const motion: any;
  export const AnimatePresence: React.FC<any>;
  export const Reorder: any;
  export const useAnimation: () => any;
  export const useMotionValue: <V = any>(initial: V) => any;
  export const useMotionTemplate: (...values: any[]) => any;
  export const useVelocity: (value: any) => any;
  export const useTransform: (...args: any[]) => any;
  export const useViewportScroll: () => any;
  export const useScroll: (options?: any) => any;
  export const useElementScroll: (ref: React.RefObject<HTMLElement>) => any;
  export const useInView: (
    ref: React.RefObject<HTMLElement>,
    options?: any,
  ) => boolean;
  export const useSpring: (args: any) => any;
  export const useSpringValue: (initial?: number | string) => any;
}
