'use client'

import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from 'next/navigation';

const Sidebar = () => {

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    
    return pathname.startsWith(path) ? 'bg-[color:var(--bg)] text-white' : 'text-white';
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('#sidebar') && isOpen) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <div className='md:hidden fixed'>
        {!isOpen && (
          <button className='p-2'
            onClick={toggleSidebar}>
            <RxHamburgerMenu />
          </button>

        )}
      </div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={closeSidebar}></div>}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block bg-[color:var(--bgSoft)] p-4 flex flex-col h-full z-50 fixed w-48 md:w-60 gap-5`}>
        <div className='mb-5 text-center'>
          <span className='text-xl text-white'>
          <Link href="/">MadAboutMovies</Link></span>
        </div>
        <nav>
          <ul>
            <li className={`hover:bg-[color:var(--bg)] transition-colors p-2 rounded ${isActive('/sequence')}`}>
              <Link href="/sequence">Sequence</Link>
            </li>
            <li className={`hover:bg-[color:var(--bg)] transition-colors p-2 rounded ${isActive('/dialogue')}`}>
              <Link href="/dialogue">Dialogue</Link>
            </li>
            <li className={`hover:bg-[color:var(--bg)] transition-colors p-2 rounded ${isActive('/scene')}`}>
              <Link href="/scene">Scene</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;