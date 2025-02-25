import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { authStore } from "../store/authStore";
import { EyeClose, EyeOpen } from "../components/Eye";
import { Auth, Heading, Info, Label, Submit } from "../components/Form";
import { httpLogin } from "../api/axios";

export interface Login {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const eyeToggle = authStore((state) => state.eyeToggle);
  const handleToggleEye = authStore((state) => state.handleToggleEye);
  const setAuth = authStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Login>();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async (form: Login) => await httpLogin(form),
    onSuccess: ({ data }) => {
      reset();
      toast.success(data?.message, { duration: 2000 });
      setAuth(data?.data);
      setTimeout(() => navigate("/", { replace: true }), 2000);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message, { duration: 2000 });
    },
  });

  const formSubmit = (form: Login) => loginMutation(form);

  return (
    <main className="w-screen h-screen grid place-items-center">
      <section className="w-full">
        <Heading text="Login" />
        <Info text="Please fill in the form below to Login an account." />
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="w-[90%] sm:w-[80%] mx-auto md:w-lg space-y-5"
        >
          <div>
            <Label id="email" label="Email:" />
            <input
              type={"email"}
              className="input w-full"
              placeholder="Enter you email"
              id="email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              required
              autoComplete="off"
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-2 block font-medium">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="relative">
            <Label id="password" label="Password:" />
            <input
              type={`${eyeToggle ? "text" : "password"}`}
              className="input w-full"
              placeholder="Enter you password"
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
              required
              autoComplete="off"
            />
            <span className="cursor-pointer" onClick={handleToggleEye}>
              {eyeToggle ? <EyeOpen /> : <EyeClose />}
            </span>
            {errors.password && (
              <span className="text-red-500 text-xs mt-2 block font-medium">
                {errors.password.message}
              </span>
            )}
          </div>
          <Submit text="Login" pending={isPending} />
          <div>
            <Auth
              text="Don't have an account?"
              link="/register"
              linkText="Register"
            />
          </div>
        </form>
      </section>
    </main>
  );
};
