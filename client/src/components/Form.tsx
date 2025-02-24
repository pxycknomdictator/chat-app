import { Link } from "react-router-dom";

export const Heading = ({ text }: { text: string }) => (
  <h1 className="text-[1.5rem] md:text-[1.7rem] font-medium text-center mb-2">
    {text}
  </h1>
);

export const Label = ({ id, label }: { id: string; label: string }) => (
  <label id={id} className="text-[14px] font-medium mb-1.5 block">
    {label}
  </label>
);

export const Auth = ({
  text,
  link,
  linkText,
}: {
  text: string;
  link: string;
  linkText: string;
}) => (
  <p className="text-[14px] font-medium">
    {text}{" "}
    <span className="text-blue-500 hover:text-blue-600 hover:underline">
      <Link to={link}>{linkText}</Link>
    </span>
  </p>
);

export const Submit = ({ text }: { text: string }) => {
  return (
    <button
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
