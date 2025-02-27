import { useParams } from "react-router-dom";

export const Chat = () => {
  const { id } = useParams();
  return <div className="w-[65.3rem]">Chat {id}</div>;
};
