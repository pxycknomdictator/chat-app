import { Link } from "react-router-dom";

import { User } from "./Sidebar";

export const Users = ({ user }: { user: User }) => {
  return (
    <Link to={`/users/${user._id}`}>
      <li
        role="listitem"
        className="w-full hover:bg-base-100 cursor-pointer py-3 pl-4 rounded-[6px] flex items-center gap-5"
      >
        <div className="indicator">
          <span
            className={`indicator-item w-3 h-3 ${user.status === "online" ? "bg-green-500 border-2" : "indicator"} rounded-full`}
          ></span>
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={user.avatar}
              className="w-full h-full object-cover object-center"
              crossOrigin="anonymous"
            />
          </div>
        </div>
        <span>{user.username}</span>
      </li>
    </Link>
  );
};
