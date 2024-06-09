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
    { href: '/sequence', label: 'Arrange The Scenes' },
    { href: '/dialogue', label: 'Guess From Dialogue' },
    { href: '/scene', label: 'Guess From Scene' },
    { href: '/complete-dialogue', label: 'Complete The Dialogue' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact Us' },
  ];

  return (
    <div className='fixed z-50'>
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
      <div className={`${isOpen ? 'block' : 'hidden'} bg-bgSoft p-3 flex flex-col h-full fixed w-48 md:w-60 gap-2`}>
        <div className='text-center'>
          <span className='text-xl text-white'>
            <Link href="/">MadAboutMovies</Link>
          </span>
        </div>
        <hr className="border-t border-gray-300" />
        <nav className='text-center text-sm md:text-lg'>
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
