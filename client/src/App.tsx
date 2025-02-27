import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Chat } from "./components/Chat";
import { ProtectedRoute } from "./components/Protected";

export const App = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      children: [{ path: "users/:id", element: <Chat /> }],
    },
  ]);
  return <RouterProvider router={router} />;
};
