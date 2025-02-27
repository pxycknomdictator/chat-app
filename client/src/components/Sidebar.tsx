import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { httpProfile, httpRefreshToken, httpUsers } from "../api/axios";
import { Users } from "./Users";

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

export const Sidebar = () => {
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    (async () => {
      await httpRefreshToken();
      setTokenRefreshed(true);
    })();
  }, []);

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: httpUsers,
    enabled: tokenRefreshed,
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: httpProfile,
    enabled: tokenRefreshed,
  });

  const filteredUsers = users?.data?.data.filter((user: User) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <aside className="w-80 p-3 bg-base-200 min-h-screen" role="complementary">
      <section className="flex justify-between">
        <h1
          className="text-xl mb-4 font-semibold"
          role="heading"
          aria-level={1}
        >
          Chat App
        </h1>
        <NavLink
          state={profile?.data.data}
          className="w-8 rounded-full"
          to={`/profile/${profile?.data?.data.username.toLowerCase()}`}
        >
          <img
            className="w-full object-cover object-left rounded-full"
            src={profile?.data?.data.avatar}
            crossOrigin="use-credentials"
          />
        </NavLink>
      </section>
      <input
        type="search"
        className="input w-full"
        name="search"
        id="search"
        placeholder="Search Users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
        autoComplete="off"
        aria-label="Search Users"
      />
      <ul className="space-y-2.5 mt-3" role="list">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user: User) => (
            <Users key={user._id} user={user} />
          ))
        ) : (
          <p className="text-gray-500 text-sm font-medium" role="alert">
            No users found
          </p>
        )}
      </ul>
    </aside>
  );
};
