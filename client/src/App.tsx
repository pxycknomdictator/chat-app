import { useEffect, useState, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Chat } from "./components/Chat";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/Protected";

export const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  console.log(`Kya mobile ha ${isMobile}`);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const router = useMemo(
    () =>
      createBrowserRouter([
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/profile/:username", element: <Profile /> },
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
          children: isMobile ? [] : [{ path: "users/:_id", element: <Chat /> }],
        },
        ...(isMobile ? [{ path: "users/:_id", element: <Chat /> }] : []),
      ]),
    [isMobile],
  );

  return <RouterProvider router={router} />;
};
