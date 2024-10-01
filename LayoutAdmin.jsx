import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './src/admin/components/Sidebar';
// import useAuthGuard from './src/features/useAuthGuard';
// import Navbar from './components/Navbar';

const LayoutAdmin = () => {
  // useAuthGuard();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* <Navbar /> */}
      <div className="flex flex-1">
        <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <div className={`flex flex-col w-full transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
          <div className="mt-16 p-4" style={{ minHeight: "calc(100vh - 4rem)" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
