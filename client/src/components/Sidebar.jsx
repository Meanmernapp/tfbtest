import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-1/4 p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <ul>
        <li className="mb-2">Dashboard</li>
        <li className="mb-2">Users</li>
        <li className="mb-2">Settings</li>
        {/* Add more sidebar items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
