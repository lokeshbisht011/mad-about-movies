import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-[color:var(--bgSoft)] p-4 flex flex-col h-screen fixed">
      <button className="px-4 py-2 mb-2 rounded-lg bg-green-500">Manage</button>
      <button className="px-4 py-2 mb-2 rounded-lg bg-green-500">Automate</button>
    </div>
  );
};

export default Sidebar;
