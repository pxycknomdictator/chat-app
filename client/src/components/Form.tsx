import { Link } from "react-router-dom";

export const Heading = ({ text }: { text: string }) => (
  <h1 className="text-[1.7rem] font-medium text-center mb-2">{text}</h1>
);

export const Label = ({ id, label }: { id: string; label: string }) => (
  <label id={id} className="text-[14px] font-medium mb-1.5 block">
    {label}
  </label>
);

export const Auth = ({ text, link }: { text: string; link: string }) => (
  <p className="text-[14px] font-medium mt-2">
    {text}{" "}
    <span className="text-blue-500 hover:text-blue-600 hover:underline">
      <Link to={link}>Login</Link>
    </span>
  </p>
);
