import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Message } from "./Message";
import { ChatContext } from "../pages/Home";
import { useQuery } from "@tanstack/react-query";
import { httpMessages } from "../api/axios";

export interface MessageFace {
  _id: string;
  message: string;
  sender: string;
  receiver: string;
}

export const Chat = () => {
  const socket = useContext(ChatContext);

  const [message, setMessage] = useState<string>("");
  const { _id } = useParams();

  const { data: conversations, refetch } = useQuery({
    queryKey: ["conversations", _id],
    queryFn: async () => await httpMessages(_id!),
  });

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", () => refetch());

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSubmitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket && message.trim()) {
      socket.emit("sendMessage", message, _id);
    }
    setMessage("");
  };

  return (
    <div className="w-[65.3rem] flex flex-col justify-between px-4 py-5">
      <div>User Id: {_id}</div>
      <div className="bg-green-500 py-3 overflow-x-auto">
        {conversations?.data?.data?.map((message: MessageFace) => (
          <Message key={message._id} messages={message} />
        ))}
      </div>
      <form onSubmit={handleSubmitMessage}>
        <section className="flex gap-2.5">
          <input
            type="text"
            className="input w-full"
            value={message}
            name="message"
            placeholder="Enter a message..."
            id="message"
            required
            onChange={(event) => setMessage(event.target.value)}
            autoComplete="off"
          />
          <button className="btn bg-blue-500 hover:bg-blue-600 transition-all text-white">
            Submit
          </button>
        </section>
      </form>
    </div>
  );
};
