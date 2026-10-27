import { useSelector } from "react-redux";

const UserName = () => {
  // get state from redux
  const userName = useSelector((state) => state.user.userName);
  if (!userName) return null;
  return (
    <div className="hidden max-w-40 truncate text-sm font-semibold md:block lg:max-w-56">{userName}</div>
  );
};
export default UserName;
