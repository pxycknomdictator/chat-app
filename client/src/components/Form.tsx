import { Link } from "react-router-dom";

type Heading = { text: string };

export const Heading = ({ text }: Heading) => (
  <h1 className="text-[1.5rem] md:text-[1.7rem] font-medium text-center mb-2">
    {text}
  </h1>
);

type Label = { id: string; label: string };

export const Label = ({ id, label }: Label) => (
  <label id={id} className="text-[14px] font-medium mb-1.5 block">
    {label}
  </label>
);

type Auth = {
  text: string;
  link: string;
  linkText: string;
};

export const Auth = ({ text, link, linkText }: Auth) => (
  <p className="text-[14px] font-medium">
    {text}{" "}
    <span className="text-blue-500 hover:text-blue-600 hover:underline">
      <Link to={link}>{linkText}</Link>
    </span>
  </p>
);

type Submit = {
  text: string;
  pending: boolean;
};

export const Submit = ({ text, pending }: Submit) => {
  return (
    <button
      disabled={pending}
      className="btn btn-block mb-3 bg-blue-500 hover:bg-blue-600"
      type={"submit"}
    >
      {text}
    </button>
  );
};

export const Info = ({ text }: { text: string }) => (
  <p className="text-[12px] md:text-[14px] font-medium mb-3.5 text-center">
    {text}
  </p>
);
