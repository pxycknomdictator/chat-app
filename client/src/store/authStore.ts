import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStoreInterface {
  eyeToggle: boolean;
  auth: null | unknown;
  handleToggleEye: () => void;
  setAuth: (data: unknown) => void;
}

export const authStore = create<AuthStoreInterface>()(
  persist(
    (set) => ({
      eyeToggle: false,
      auth: null,
      handleToggleEye: () => set((state) => ({ eyeToggle: !state.eyeToggle })),
      setAuth: (data) => set({ auth: data }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
