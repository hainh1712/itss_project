import { Link } from "react-router-dom";
import SearchBar from "./layouts/SearchBar";
import { useAuth } from "../contexts/AuthContext";
const Header = () => {
  const authInfo = useAuth();
  const { isLoggedIn, logout } = authInfo
    ? authInfo
    : { isLoggedIn: false, logout: () => {} };

  return (
    <>
      <div className="bg-white h-14 flex items-center sticky top-0">
        <div className="font-bold text-[20px] leading-5 pl-6">HEDSOCIAL</div>
        <div className="w-1/6 px-1 py-1.5 mx-10 flex items-center text-center">
          <Link
            to=""
            className="w-1/2 bg-[#eeeeee] rounded-lg px-1 py-1.5 text-[#0079D3] font-bold text-[15px] mr-2"
          >
            HOME
          </Link>
          <Link
            to=""
            className="w-1/2 font-bold text-[15px] text-black opacity-50"
          >
            VIDEO CALL
          </Link>
        </div>
        <SearchBar />
        <div className="flex items-center text-center w-1/6">
          {isLoggedIn ? (
            <button
              className="bg-[#0e64d2] text-white rounded-lg px-4 py-2"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-[#0e64d2] text-white rounded-lg px-4 py-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
