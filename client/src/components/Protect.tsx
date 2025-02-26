import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { authStore } from "../store/authStore";

export const Protect = ({ children }: { children: ReactNode }) => {
  const auth = authStore((state) => state.auth);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
