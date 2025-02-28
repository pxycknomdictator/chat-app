import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthData {
  accessToken: string;
  userId?: string;
}

interface AuthStoreInterface {
  eyeToggle: boolean;
  auth: AuthData | null;
  handleToggleEye: () => void;
  setAuth: (data: AuthData) => void;
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
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
