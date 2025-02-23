import { EyeClose, EyeOpen } from "../components/Eye";
import { Submit } from "../components/Submit";
import { Auth, Heading, Label } from "../components/Form";

export const Register = () => {
  const toggle = false;
  return (
    <main className="w-screen h-screen grid place-items-center">
      <section>
        <Heading text="Register" />
        <form className="w-lg space-y-4">
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
        </form>
        <Auth text="Don't have an account?" link="/login" />
      </section>
    </main>
  );
};
