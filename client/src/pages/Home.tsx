import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { configurations } from "../config/config";

export const ChatContext = createContext<Socket | null>(null);

export const Home = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(configurations.SERVER_SOCKET, {
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("❌ Socket disconnected");
    };
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <ChatContext.Provider value={socket}>
        <Outlet />
      </ChatContext.Provider>
    </div>
  );
};
