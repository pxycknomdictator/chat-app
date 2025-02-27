import { Link, useLocation, useParams } from "react-router-dom";

export const Profile = () => {
  const { username } = useParams();
  const data = useLocation();
  console.log(data);

  return (
    <div>
      <span>{username} Profile</span>
      <Link
        to="/"
        replace
        className="btn bg-blue-500 hover:bg-blue-600 transition-all"
      >
        Go Back
      </Link>
    </div>
  );
};
