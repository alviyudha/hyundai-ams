import { FaComments, FaClipboard, FaUsers, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { asyncUnsetAuthUser } from "../../states/login/action";

const Sidebar = ({ collapsed, toggleCollapsed, authUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Vehicles", icon: <FaComments size={18} />, link: "/admin-hyundai/vehicles" },
    { name: "Colors", icon: <FaClipboard size={18} />, link: "/admin-hyundai/colors" },
    { name: "Image Slide", icon: <FaUsers size={18} />, link: "/admin-hyundai/image-slide" },
    { name: "Specifications", icon: <FaEnvelope size={18} />, link: "/admin-hyundai/specifications" },
    { name: "Dealers", icon: <FaEnvelope size={18} />, link: "/admin-hyundai/dealers" },
    { name: "Trims", icon: <FaEnvelope size={18} />, link: "/admin-hyundai/trims" },
  ];

  const logout = () => {
    dispatch(asyncUnsetAuthUser());
    localStorage.removeItem("token");
    navigate("/admin-hyundai");
  };

  return (
    <div className={`fixed top-0 left-0 z-50 h-full bg-gray-800 text-gray-100 transition-all duration-300 ${collapsed ? "w-14" : "w-64"}`}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between px-2 py-2 bg-gray-900">
            <h4 className={`${collapsed ? "hidden" : "block"} font-semibold text-lg text-white`}>{authUser ? authUser.username : "Guest"}</h4>
            <button
              className="text-white bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 p-1 rounded-lg"
              onClick={toggleCollapsed}
            >
              {collapsed ? ">" : "<<"}
            </button>
          </div>
          <nav className="mt-5">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg"
                  >
                    {item.icon}
                    <span className={`${collapsed ? "hidden" : "ml-4"}`}>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="px-2 py-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg"
          >
            <FaSignOutAlt size={20} />
            <span className={`${collapsed ? "hidden" : "ml-2"}`}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
  authUser: PropTypes.object.isRequired,
};

export default Sidebar;
