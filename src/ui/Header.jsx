import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-stone-200 bg-yellow-400 px-4 py-3 font-pizza uppercase sm:gap-6 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="shrink-0 text-xs tracking-wider sm:text-sm sm:tracking-widest md:text-base"
      >
        Fast React Pizz Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
};
export default Header;
