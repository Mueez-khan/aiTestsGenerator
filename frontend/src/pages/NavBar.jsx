import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlignJustify, X } from "lucide-react";

export default function NavBar() {
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const token = localStorage.getItem("token");
  const closeDropdown = () => setDropDown(false);

  return (
    <div className={token ? "block" : "hidden"}>
        <nav className="bg-gray-900 text-white fixed top-0 w-full shadow-lg z-50">
      {/* Desktop Navbar */}
      <div className="hidden sm:flex justify-center items-center h-14">
        <div
          onClick={() => navigate("/")}
          className="m-4 cursor-pointer text-lg font-semibold hover:text-gray-300 transition-all"
        >
          Home
        </div>
        <div
          onClick={() => navigate("/generatedTests")}
          className="m-4 cursor-pointer text-lg font-semibold hover:text-gray-300 transition-all"
        >
          Generated Code 
        </div>
        <div
          onClick={() => navigate("/favoriteTests")}
          className="m-4 cursor-pointer text-lg font-semibold hover:text-gray-300 transition-all"
        >
          Favorite Code ❤
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="sm:hidden flex items-center justify-between px-4 h-14">
        <div className="text-xl font-bold">📸 Image Hub</div>
        <AlignJustify
          color="white"
          className="cursor-pointer"
          size={28}
          onClick={() => setDropDown(!dropDown)}
        />
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed inset-0 bg-black z-50  flex flex-col items-center justify-center transition-transform transform ${
          dropDown ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } duration-300`}
      >
        <X
          color="white"
          size={32}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeDropdown}
        />
        <div
          onClick={() => {
            navigate("/");
            closeDropdown();
          }}
          className="text-2xl my-4 cursor-pointer hover:text-gray-400 transition-all"
        >
          Home
        </div>
        <div
          onClick={() => {
            navigate("/generatedTests");
            closeDropdown();
          }}
          className="text-2xl my-4 cursor-pointer hover:text-gray-400 transition-all"
        >
          My Generated Stories
        </div>
        <div
          onClick={() => {
            navigate("/favoriteTests");
            closeDropdown();
          }}
          className="text-2xl my-4 cursor-pointer hover:text-gray-400 transition-all"
        >
          Favorite Stores
        </div>
      </div>
    </nav>
    </div>
  );
}
