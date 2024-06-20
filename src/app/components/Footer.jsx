import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg--bg text-text py-6 mt-auto">
            <hr className="border-t border-line md:mx-20 mx-5 mb-5"/>
            <div className="container mx-auto text-center">
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">MadAboutMovies</h2>
                    <div className="flex justify-center space-x-4">
                        <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-xl hover:text-blue-500 transition-colors" />
                        </Link>
                        <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-xl hover:text-blue-400 transition-colors" />
                        </Link>
                        <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-xl hover:text-pink-500 transition-colors" />
                        </Link>
                        <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="text-xl hover:text-red-500 transition-colors" />
                        </Link>
                    </div>
                </div>
                <div className="mb-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/privacy-policy">
                                <span className="hover:underline cursor-pointer">Privacy Policy</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/tnc">
                                <span className="hover:underline cursor-pointer">Terms & Conditions</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <p className='text-sm mb-4 mx-10'>Disclaimer: All movie scenes on this website are the property of their respective owners<br/> 
                    and are used for informational and educational purposes only. No copyright infringement is intended.</p>
                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} Mad About Movies. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;