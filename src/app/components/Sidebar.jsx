import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-[color:var(--bgSoft)] p-4 flex flex-col h-screen fixed justify-center">
      <button className="px-4 py-2 mb-2 rounded-lg bg-blue-500">
        <Link href="/">Home</Link>
      </button>
      <button className="px-4 py-2 mb-2 rounded-lg bg-blue-500">
        <Link href="/dialogue">Dialogue</Link>
      </button>
    </div>
  );
};

export default Sidebar;
