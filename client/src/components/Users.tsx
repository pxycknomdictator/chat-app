import { Link } from "react-router-dom";
import { User } from "./Sidebar";

export const Users = ({ user }: { user: User }) => {
  return (
    <Link to={`/users/${user._id}`}>
      <li className="w-full hover:bg-base-100 cursor-pointer py-3 pl-4 rounded-[6px]">
        {user.username}
      </li>
    </Link>
  );
};
