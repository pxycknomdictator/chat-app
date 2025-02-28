import { authStore } from "../store/authStore";
import { jwtDecode } from "jwt-decode";
import { MessageFace } from "./Chat";

interface User {
  _id: string;
  username: string;
  email: string;
}

const Left = ({ message }: { message: string }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble">{message}</div>
    </div>
  );
};
const Right = ({ message }: { message: string }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble">{message}</div>
    </div>
  );
};

export const Message = ({ messages }: { messages: MessageFace }) => {
  const auth = authStore.getState().auth;
  const decode = jwtDecode(auth?.accessToken!) as User;

  return (
    <>
      {decode._id === messages.sender ? (
        <Right message={messages.message} />
      ) : (
        <Left message={messages.message} />
      )}
    </>
  );
};
