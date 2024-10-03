import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./src/admin/components/Sidebar";

const LayoutAdmin = ({ authUser }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} authUser={authUser} />
      <div className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}>
        <div className="p-6 md:p-8 mt-16 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
