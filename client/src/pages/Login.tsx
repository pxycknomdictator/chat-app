import { authStore } from "../store/authStore";

import { EyeClose, EyeOpen } from "../components/Eye";
import { Auth, Heading, Info, Label, Submit } from "../components/Form";

export const Login = () => {
  const { eyeToggle, handleToggleEye } = authStore();

  return (
    <main className="w-screen h-screen grid place-items-center">
      <section className="w-full">
        <Heading text="Login" />
        <Info text="Please fill in the form below to Login an account." />
        <form className="w-[90%] sm:w-[80%] mx-auto md:w-lg space-y-5">
          <div>
            <Label id="email" label="Email:" />
            <input
              type={"email"}
              className="input w-full"
              placeholder="Enter you email"
              id="email"
              required
              autoComplete="off"
            />
          </div>
          <div className="relative">
            <Label id="password" label="Password:" />
            <input
              type={`${eyeToggle ? "text" : "password"}`}
              className="input w-full"
              placeholder="Enter you password"
              id="password"
              required
              autoComplete="off"
            />
            <span className="cursor-pointer" onClick={handleToggleEye}>
              {eyeToggle ? <EyeOpen /> : <EyeClose />}
            </span>
          </div>
          <Submit text="Login" />
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
