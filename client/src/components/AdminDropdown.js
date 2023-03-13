import React, { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useRouter } from "next/router";
import { removeAdminToken } from "@/utils/removeAdminToken";

export default function Dropdown({ adminData }) {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // function to handle dropdown toggle
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // function to handle logout button click
    const handleLogout = () => {
        removeAdminToken();
        router.push("/");
    };

    // Attaches an event listener for the 'mousedown' event to detect a click outside the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <li className="mr-4 cursor-pointer relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-center bg-[color:var(--darker-secondary-color)] text-white text-sm font-medium rounded-md w-28 h-10 focus:outline-none"
            >
                <span className="mr-2">Admin</span>
                <FaAngleDown
                    className={`h-4 w-4 ${
                        showDropdown ? "transform rotate-180" : ""
                    }`}
                />
            </button>
            {showDropdown && (
                <div className="absolute min-w-[231px] right-0 bg-white rounded-md overflow-hidden shadow-lg z-10">
                    <div className="">
                        <div className="px-4 py-2 cursor-default hover:bg-[color:var(--primary-color)]">
                            <div className="text-gray-800 font-medium">
                                Full Name
                            </div>
                            <div className="text-gray-600">
                                {adminData.name}
                            </div>
                        </div>
                        <hr />
                        <div className="px-4 pb-2 cursor-default hover:bg-[color:var(--primary-color)]">
                            <div className="text-gray-800 font-medium pt-2">
                                Email
                            </div>
                            <div className="text-gray-600">
                                {adminData.email}
                            </div>
                        </div>
                        <hr />
                        {/* Add other details here */}
                    </div>
                    <div
                        onClick={handleLogout}
                        className="py-4 group hover:bg-[color:var(--darker-secondary-color)] transition-all ease-in-out"
                    >
                        <button
                            className="text-left w-full px-4 text-gray-800 group-hover:text-white transition-all ease-in-out"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
}
