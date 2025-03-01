import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Message, Right } from "./Message";
import { ChatContext } from "../pages/Home";
import { useQuery } from "@tanstack/react-query";
import { httpMessages, httpUser } from "../api/axios";

export interface MessageFace {
  _id: string;
  message: string;
  sender: string;
  receiver: string;
}

export const Chat = () => {
  const socket = useContext(ChatContext);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [conversation, setConversation] = useState<string[]>([]);

  const [message, setMessage] = useState<string>("");
  const { _id } = useParams();

  const { data: conversations, refetch } = useQuery({
    queryKey: ["conversations", _id],
    queryFn: async () => await httpMessages(_id!),
  });

  const { data: user } = useQuery({
    queryKey: ["user", _id],
    queryFn: async () => await httpUser(_id!),
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation, conversations]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", () => {
      refetch();
    });

    return () => {
      setConversation([]);
    };
  }, [socket]);

  const handleSubmitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (socket && message.trim()) {
      socket.emit("sendMessage", message, _id);
      setConversation((prev) => [...prev, message]);
    }
    setMessage("");
  };

  return (
    <div className="w-[65.3rem] flex flex-col h-screen px-4 py-5">
      <div className="w-full py-2 mb-2 pl-2">
        <div className="flex items-center gap-4">
          <div className="w-9 rounded-full">
            <img
              className="w-full object-cover object-left rounded-full"
              src={user?.data?.data.avatar}
              crossOrigin="anonymous"
            />
          </div>
          <div>
            <span className="font-semibold mb-1 block">
              {user?.data?.data.username}
            </span>{" "}
            <p className="text-gray-500 text-[12px]">
              {user?.data?.data.status}
            </p>
          </div>
        </div>
      </div>

      {conversations?.data.data && conversations.data.data.length <= 0 ? (
        <div className="py-3 h-screen grid place-items-center">
          <h1 className="text-3xl font-semibold text-gray-700 rounded-lg">
            No Chats
          </h1>
        </div>
      ) : (
        <div className="py-3 overflow-y-auto max-h-full">
          {conversations?.data?.data?.map((message: MessageFace) => (
            <Message key={message._id} messages={message} />
          ))}
          {conversation.map((msg, index) => (
            <Right key={index} message={msg} />
          ))}
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
