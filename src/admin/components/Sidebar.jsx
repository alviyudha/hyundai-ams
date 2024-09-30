import React, { useEffect } from 'react';
import { FaComments, FaClipboard, FaUsers, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, reset, getMe } from '../../features/authSlice';

const menuItems = [
  {
    name: 'Vehicles',
    icon: <FaComments size={18} className="text-gray-600" />,
    link: '/admin-hyundai/vehicles',
  },
  {
    name: 'Colors',
    icon: <FaClipboard size={18} className="text-gray-600" />,
    link: '/admin-hyundai/colors',
  },
  {
    name: 'Image Slide',
    icon: <FaUsers size={18} className="text-gray-600" />,
    link: '/admin-hyundai/image-slide',
  },
  {
    name: 'Specifications',
    icon: <FaEnvelope size={18} className="text-gray-600" />,
    link: '/admin-hyundai/specifications',
  },
  {
    name: 'Dealers',
    icon: <FaEnvelope size={18} className="text-gray-600" />,
    link: '/admin-hyundai/dealers',
  },
  {
    name: 'Trims',
    icon: <FaEnvelope size={18} className="text-gray-600" />,
    link: '/admin-hyundai/trims',
  },
];

const Sidebar = ({ collapsed, toggleCollapsed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/admin-hyundai");
  };

  return (
    <div className='flex flex-col h-screen transition-transform'>
      {/* Drawer init and show */}
      <div className="text-center">
        <button
          className="text-white bg-blue-950 hover:bg-blue-950 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 dark:bg-blue-950 dark:hover:bg-blue-950 focus:outline-none dark:focus:bg-blue-800"
          type="button"
          onClick={toggleCollapsed}
        >
          {collapsed ? '>' : 'Hide navigation'}
        </button>
      </div>

      {/* Drawer component */}
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-${collapsed ? '20' : '64'} h-screen p-4 overflow-y-auto transition-transform bg-gray-600 dark:bg-gray-800 ${
          collapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <div className="flex items-center p-4 bg-gray-900 border-b border-gray-700 mb-4 mt-3">
          <h4 className="text-white font-semibold text-lg">{user?.username || 'Guest'}</h4>
        </div>
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {item.icon}
                  <span className={`ml-3 ${collapsed ? 'hidden' : 'block'}`}>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
