import { create } from "zustand";

export type FrameType = "iphone" | "macbook" | "browser" | "none";
export type BackgroundType = "gradient" | "solid" | "transparent";
export type ShadowSize = "none" | "sm" | "md" | "xl" | "2xl";

export interface BackgroundConfig {
  type: BackgroundType;
  color1: string;
  color2: string;
  direction: string;
}

export interface MockupActions {
  setImage: (image: string) => void;
  setFrame: (frame: FrameType) => void;
  setBackground: (background: Partial<BackgroundConfig>) => void;
  setPadding: (padding: number) => void;
  setShadow: (shadow: ShadowSize) => void;
  setBorderRadius: (borderRadius: number) => void;
  setTilt: (tilt: number) => void;
  reset: () => void;
}

export interface MockupState extends MockupActions {
  image: string;
  frame: FrameType;
  background: BackgroundConfig;
  padding: number;
  shadow: ShadowSize;
  borderRadius: number;
  tilt: number;
  actions: MockupActions;
}

const initialState = {
  image: "",
  frame: "browser" as FrameType,
  background: {
    type: "gradient" as BackgroundType,
    color1: "#6366f1",
    color2: "#ec4899",
    direction: "to bottom right",
  },
  padding: 64,
  shadow: "2xl" as ShadowSize,
  borderRadius: 0,
  tilt: 0,
};

export const useMockupStore = create<MockupState>((set) => {
  const actions: MockupActions = {
    setImage: (image) => set({ image }),
    setFrame: (frame) => set({ frame }),
    setBackground: (bg) =>
      set((state) => ({
        background: { ...state.background, ...bg },
      })),
    setPadding: (padding) => set({ padding }),
    setShadow: (shadow) => set({ shadow }),
    setBorderRadius: (borderRadius) => set({ borderRadius }),
    setTilt: (tilt) => set({ tilt }),
    reset: () => set(initialState),
  };

  return {
    ...initialState,
    ...actions,
    actions,
  };
});
