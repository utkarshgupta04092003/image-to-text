import React, { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <svg className="w-6 h-6 mr-2 hidden md:flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <svg
                        className="w-6 h-6 mr-2 md:hidden cursor-pointer "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={toggleMenu}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <span className="text-black font-bold text-2xl">Image2Script</span>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <span className="text-black font-semibold cursor-pointer">Home</span>
                    <span className="text-black font-semibold cursor-pointer">Features</span>
                    <span className="text-black font-semibold cursor-pointer">Pricing</span>
                    <span className="text-black font-semibold cursor-pointer">Pricing</span>

                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Sign Up</button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded">Login</button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden mt-2 flex flex-col">
                    <span className="text-black font-semibold cursor-pointer m-2">Home</span>
                    <span className="text-black font-semibold cursor-pointer m-2">Features</span>
                    <span className="text-black font-semibold cursor-pointer m-2">Pricing</span>
                    <span className="text-black font-semibold cursor-pointer m-2">Pricing</span>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-2 block max-w-[100px]">Sign Up</button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded block max-w-[100px]">Login</button>
                </div>
            )}
        </nav>
    );
};

export default Header;

