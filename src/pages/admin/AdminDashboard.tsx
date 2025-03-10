import React, { useState } from 'react';
import { RiBookShelfFill } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../../api/api";

const AdminDashboard: React.FC = () => {
    const [isHome, setIsHome] = useState(true); // default
    const [isBooks, setIsBooks] = useState(false);
    const [isReq, setIsReq] = useState(false);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('home');

    const handleNavClick = (tab: string) => {
        setActiveTab(tab);
    };

    const HomeToggle = () => {
        setIsHome(true);
        setIsBooks(false);
        setIsReq(false);
    }

    const BooksToggle = () => {
        setIsHome(false);
        setIsBooks(true);
        setIsReq(false);
    }
    
    const ReqToggle = () => {
        setIsHome(false);
        setIsBooks(false);
        setIsReq(true);
    }

    return (
        <div className="bg-brown-0 min-h-screen flex items-center justify-center">
            <div className="bg-cream-0 flex-1 flex space-y-5 flex-row lg:space-x-10 max-w-6xl sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl h-full">

            {/* Navigation */}
                <div className="bg-brown-0 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
                    <nav className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                        <a
                            className={`text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-darkBR-0 hover:text-white smooth-hover ${activeTab === 'home' ? 'bg-darkBR-0 text-white' : ''}`}
                            href="#"
                            onClick={() => {
                                handleNavClick('home');
                                HomeToggle();}}
                        >
                            <FaHome className="h-8 w-8" />
                        </a>

                        <a
                            className={`text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-darkBR-0 hover:text-white smooth-hover ${activeTab === 'books' ? 'bg-darkBR-0 text-white' : ''}`}
                            href="#"
                            onClick={() => {
                                handleNavClick('books');
                                BooksToggle();}}
                        >
                            <RiBookShelfFill className="h-8 w-8" />
                        </a>
                    </nav>

                    <div className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
                        <a
                            className={`text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-darkBR-0 hover:text-white smooth-hover ${activeTab === 'requests' ? 'bg-darkBR-0 text-white' : ''}`}
                            href="#"
                            onClick={() => {
                                handleNavClick('requests');
                                ReqToggle();
                            }}
                        >
                            <FaAddressBook className="h-8 w-8" />
                        </a>

                        <a
                            className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-darkBR-0 hover:text-white smooth-hover"
                            href="#"
                            onClick={() => navigate("/")}
                        >
                            <RiLogoutCircleLine className="h-8 w-8" />
                        </a>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 px-2 sm:px-0 h-full flex flex-col">
                <div className="flex justify-between items-center flex-grow">
                        {isHome && (
                            <div className="flex flex-col w-full h-full flex-grow">
                                <h3 className="text-3xl font-extralight text-brown-0">Admin Dashboard</h3>

                                <h4 className="text-xl font-extralight text-brown-0 text-center mt-12">What would you like to do?</h4>

                                <div className="grid grid-cols-2 w-full h-full flex-grow items-center justify-center">
                                    <div className="pb-2 px-4 pt-4 w-full h-full flex cursor-pointer" onClick={() => {
                                        handleNavClick('books');
                                        ReqToggle();
                                    }}>
                                        <label className="flex flex-col justify-center items-center p-4 border-2 border-brown-0 cursor-pointer w-full h-full hover:bg-darkBR-0 hover:text-cream-0"
                                               htmlFor="radio_1">
                                            <span className="text-xs font-semibold uppercase font-pd">Add / Edit / Delete Books</span>
                                            <span className="text-xl font-bold mt-2">Manage book inventory</span>
                                        </label>
                                    </div>

                                    <div className="pb-2 px-4 pt-4 w-full h-full flex cursor-pointer" onClick={() => {
                                        handleNavClick('requests');
                                        ReqToggle();
                                    }}>
                                        <label className="flex flex-col justify-center items-center p-4 border-2 border-brown-0 cursor-pointer w-full h-full
                                        hover:bg-darkBR-0 hover:text-cream-0"
                                               htmlFor="radio_2">
                                            <span className="text-xs font-semibold uppercase font-pd">Approve / Deny Book Requests</span>
                                            <span className="text-xl font-bold mt-2">View book requests</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
