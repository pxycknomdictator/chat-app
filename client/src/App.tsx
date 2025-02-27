import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Chat } from "./components/Chat";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/Protected";

export const App = () => {
  const router = createBrowserRouter([
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
      children: [{ path: "users/:_id", element: <Chat /> }],
    },
  ]);
  return <RouterProvider router={router} />;
};
