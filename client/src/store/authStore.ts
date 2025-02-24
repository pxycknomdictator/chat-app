import { create } from "zustand";

interface authStoreInterface {
  eyeToggle: boolean;
  handleToggleEye: () => void;
}

export const authStore = create<authStoreInterface>((set) => ({
  eyeToggle: false,
  handleToggleEye: () => set((state) => ({ eyeToggle: !state.eyeToggle })),
}));
