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
    return pathname.startsWith(path);
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

  const menuItems = [
    { href: '/sequence', label: 'Sequence' },
    { href: '/dialogue', label: 'Dialogue' },
    { href: '/scene', label: 'Scene' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <div className='fixed'>
      <div className='text-white'>
        {!isOpen && (
          <button className='p-2' onClick={toggleSidebar}>
            <div className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8">
              <RxHamburgerMenu className="w-full h-full" />
            </div>
          </button>
        )}
      </div>
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 " onClick={closeSidebar}></div>}
      <div className={`${isOpen ? 'block' : 'hidden'}  bg-bgSoft p-4 flex flex-col h-full z-50 fixed w-48 md:w-60 gap-5`}>
        <div className='mb-2 text-center'>
          <span className='text-xl text-white'>
            <Link href="/">MadAboutMovies</Link>
          </span>
        </div>
        <hr className="my-2 border-t border-gray-300" />
        <nav className='text-center text-xl'>
          <ul>
            {menuItems.map((item, index) => {
              const activeClass = isActive(item.href) ? 'bg-sidebarSelected' : '';
              const hoverClass = !isActive(item.href) ? 'hover:bg-sidebarHover' : '';

              return (
                <div key={index}>
                  {item.label === 'About' && <hr className="my-2 border-t border-gray-300" />}
                  <li
                    className={`${hoverClass} ${activeClass} transition-colors p-2 rounded text-text`}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
