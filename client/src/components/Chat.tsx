import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useContext, useEffect, useState } from "react";

import { Message, Right } from "./Message";
import { ChatContext } from "../pages/Home";
import { httpMessages, httpUser } from "../api/axios";
import { Loader } from "./Loader";

export interface MessageFace {
  _id: string;
  message: string;
  sender: string;
  receiver: string;
}

export const Chat = () => {
  const { socket } = useContext(ChatContext);
  const { _id } = useParams();

  const [localMessages, setLocalMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const {
    data: conversations,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["conversations", _id],
    queryFn: async () => await httpMessages(_id!),
  });

  const { data: user } = useQuery({
    queryKey: ["user", _id],
    queryFn: async () => await httpUser(_id!),
  });

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = () => {
      setLocalMessages([]);
      refetch();
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, refetch]);

  const handleSubmitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket && message.trim()) {
      socket.emit("sendMessage", message, _id);
      setLocalMessages((prev) => [...prev, message]);
      setMessage("");
    }
  };

  const allMessages = [...(conversations?.data?.data || []), ...localMessages];

  return (
    <div className="w-full md:w-[80rem] flex flex-col h-screen px-4 py-5">
      <div className="w-full py-2 mb-2 pl-2">
        <div className="flex items-center justify-between md:justify-start md:relative gap-4">
          <div className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden">
            <img
              className="w-full object-cover"
              src={user?.data?.data.avatar}
              alt="avatar"
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex items-center gap-3 md:flex-col md:gap-[2px]">
            <span className="font-semibold mb-1 block text-[17px] md:text-[16px]">
              {user?.data?.data.username}
            </span>
            <p
              className={`${user?.data?.data.status === "online" ? "text-green-500" : "text-gray-500"} text-[14px]`}
            >
              {user?.data?.data.status}
            </p>
          </div>
          <Link className="btn btn-soft md:absolute md:right-0" to={"/"}>
            back
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="py-3 h-screen grid place-items-center">
          <Loader />
        </div>
      ) : allMessages.length === 0 ? (
        <div className="py-3 h-screen grid place-items-center">
          <h1 className="text-3xl font-semibold text-gray-700 rounded-lg">
            No Chats
          </h1>
        </div>
      ) : (
        <div className="py-3 overflow-y-auto h-full">
          {allMessages.map((msg, index) =>
            typeof msg === "string" ? (
              <Right key={index} message={msg} />
            ) : (
              <Message key={msg._id} messages={msg as MessageFace} />
            ),
          )}
        </div>
      )}
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
