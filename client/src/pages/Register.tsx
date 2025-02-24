import { EyeClose, EyeOpen } from "../components/Eye";
import { Auth, Heading, Label, Submit, Info } from "../components/Form";

export const Register = () => {
  const toggle = false;
  return (
    <main className="w-screen h-screen grid place-items-center">
      <section className="w-full">
        <Heading text="Register" />
        <Info text="Please fill in the form below to create an account." />
        <form className="w-[90%] sm:w-[80%] mx-auto md:w-lg space-y-5">
          <div>
            <Label id="username" label="Name:" />
            <input
              type={"text"}
              className="input w-full"
              placeholder="Enter you name"
              id="username"
              required
              autoComplete="off"
            />
          </div>
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
              type={`${toggle ? "text" : "password"}`}
              className="input w-full"
              placeholder="Enter you password"
              id="password"
              required
              autoComplete="off"
            />
            {toggle ? <EyeOpen /> : <EyeClose />}
          </div>
          <div className="relative">
            <Label id="confirm-password" label="Confirm Password:" />
            <input
              type={`${toggle ? "text" : "password"}`}
              className="input w-full"
              placeholder="Confirm Password"
              id="confirm-password"
              required
              autoComplete="off"
            />
            {toggle ? <EyeOpen /> : <EyeClose />}
          </div>
          <Submit text="Register" />
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
