import { useQuery } from "@tanstack/react-query";
import { httpUsers } from "../api/axios";

import { Users } from "./Users";

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

export const Sidebar = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: httpUsers,
  });

  return (
    <aside className="w-80 p-3 bg-base-200 min-h-screen">
      <h1 className="text-xl mb-2.5">Chat App</h1>
      <input
        type={"search"}
        className="input w-full"
        name="search"
        placeholder="Search"
        id="search"
        required
        autoComplete="off"
      />
      <ul className="space-y-2.5 mt-3">
        {users &&
          users?.data?.data.map((user: User) => (
            <Users key={user._id} user={user} />
          ))}
      </ul>
    </aside>
  );
};
