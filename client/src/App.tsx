import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const Dashboard = () => <h1>Dashboard</h1>;
const Register = () => <h1>Register</h1>;
const Login = () => <h1>Login</h1>;

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};
