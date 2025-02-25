import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { authStore } from "../store/authStore";
import { EyeClose, EyeOpen } from "../components/Eye";
import { Auth, Heading, Label, Submit, Info } from "../components/Form";
import { httpRegister } from "../api/axios";

export interface Register {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const navigate = useNavigate();

  const eyeToggle = authStore((state) => state.eyeToggle);
  const handleToggleEye = authStore((state) => state.handleToggleEye);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Register>();

  const { isPending, mutate: registerMutate } = useMutation({
    mutationFn: async (form: Register) => await httpRegister(form),
    onSuccess: ({ data }) => {
      toast.success(data?.message, { duration: 2000 });
      reset();
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message, { duration: 2000 });
    },
  });

  const formSubmit = (form: Register) => registerMutate(form);

  return (
    <main className="w-screen h-screen grid place-items-center">
      <section className="w-full">
        <Heading text="Register" />
        <Info text="Please fill in the form below to create an account." />
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="w-[90%] sm:w-[80%] mx-auto md:w-lg space-y-5"
        >
          <div>
            <Label id="username" label="Name:" />
            <input
              type={"text"}
              {...register("username", { required: "username is required" })}
              className="input w-full"
              name="username"
              placeholder="Enter you name"
              id="username"
              required
              autoComplete="off"
            />
            {errors.username && (
              <span className="text-red-500 text-xs mt-2 block font-medium">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <Label id="email" label="Email:" />
            <input
              type={"email"}
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="input w-full"
              placeholder="Enter you email"
              id="email"
              name="email"
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="Enter you password"
              id="password"
              name="password"
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
          <div className="relative">
            <Label id="confirm-password" label="Confirm Password:" />
            <input
              type={`${eyeToggle ? "text" : "password"}`}
              {...register("confirmPassword", {
                required: "confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="input w-full"
              placeholder="Confirm Password"
              id="confirm-password"
              required
              name="confirmPassword"
              autoComplete="off"
            />
            <span className="cursor-pointer" onClick={handleToggleEye}>
              {eyeToggle ? <EyeOpen /> : <EyeClose />}
            </span>
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs mt-2 block font-medium">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <Submit pending={isPending} text="Register" />
          <div>
            <Auth
              text="Already have an account?"
              link="/login"
              linkText="Login"
            />
          </div>
        </form>
      </section>
    </main>
  );
};
