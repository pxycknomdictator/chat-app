import { Outlet } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { createContext, useEffect, useState } from "react";

import { Sidebar } from "../components/Sidebar";
import { configurations } from "../config/config";

export interface ChatContextType {
  socket: Socket | null;
}

export const ChatContext = createContext<ChatContextType>({
  socket: null,
});

export const Home = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const newSocket = io(configurations.SERVER_SOCKET, {
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className={`${!isMobile && "flex"}`}>
      <Sidebar />
      <ChatContext.Provider value={{ socket }}>
        <Outlet />
      </ChatContext.Provider>
    </div>
  );
};
