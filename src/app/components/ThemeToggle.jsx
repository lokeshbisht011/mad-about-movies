'use client'

import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className='fixed top-2 right-2'>
            <button
                onClick={toggleTheme}
                className="border text-white px-2 py-1 rounded-md flex items-center">
                {theme === 'light' ? (
                    <FaSun className="text-xl text-yellow-500" />
                ) : (
                    <FaMoon className="text-xl"/>
                )}
            </button>
        </div>
    );
};

export default ThemeToggle;
