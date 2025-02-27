import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

export const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const { _id } = useParams();

  const handleSubmitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
  };

  return (
    <div className="w-[65.3rem] flex flex-col justify-between px-4 py-5">
      <div>User Id: {_id}</div>
      <form onSubmit={handleSubmitMessage}>
        <section className="flex gap-2.5">
          <input
            type={"text"}
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
