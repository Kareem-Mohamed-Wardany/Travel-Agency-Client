"use client"; // Ensure this runs only on the client

import React, { useEffect, useState } from "react";
import {
  Plane,
  User,
  LogOut,
  LayoutDashboard,
  CalendarCheck,
} from "lucide-react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setLogOut } from "@/store/auth-slice";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [clientUser, setClientUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ensure localStorage access only on the client
  useEffect(() => {
    setClientUser(user); // Update user after hydration
  }, [user]);

  // Get first letter of userName
  const userInitial = clientUser?.userName
    ? clientUser.userName.charAt(0).toUpperCase()
    : "";

  // Logout handler
  const handleLogout = () => {
    dispatch(setLogOut()); // Clear Redux auth state
    router.push("/"); // Redirect to home page
  };

  return (
    <nav
      className="flex items-center justify-between w-full h-16 bg-gray-900 text-white px-6"
      aria-label="Main Navigation"
    >
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-2 cursor-pointer">
          <Plane className="h-8 w-8" />
          <span className="text-lg font-semibold">Travel Agency</span>
        </div>
      </Link>

      {/* Right Section: Show Avatar with Dropdown if Logged In */}
      {isAuthenticated && clientUser ? (
        <div className="relative">
          {/* Avatar */}
          <div
            className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white font-bold text-xl rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {userInitial || <User className="w-6 h-6" />}
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded-lg shadow-lg z-30">
              <div className="px-4 py-2 text-sm">{clientUser.userName}</div>
              {/* User-specific links */}
              {clientUser.role === "user" && (
                <Link href="/reservations">
                  <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">
                    <CalendarCheck className="w-4 h-4 mr-2" />
                    Reservations
                  </div>
                </Link>
              )}

              {/* Admin-specific links */}
              {clientUser.role === "admin" && (
                <Link href="/admin/trips">
                  <div className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Admin Panel
                  </div>
                </Link>
              )}

              <hr className="border-gray-300" />
              <hr className="border-gray-300" />
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link href="/auth/login">
          <button className="px-4 py-2 bg-white text-gray-800 rounded-full hover:bg-gray-700 hover:text-white transition-colors">
            Log in
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Header;
