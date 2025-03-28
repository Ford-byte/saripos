"use client";

import Cart from "@/public/icons/cart";
import Magnify from "@/public/icons/magnify";
import { useUserStore } from "@/public/store/userStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeaderComponents() {
  const { isLogin, logOut } = useUserStore();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  if (!isLogin) {
    return <div></div>;
  }

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="center border-b shadow-md w-full fixed bg-white z-[1000]">
      <div className="container py-4 flex justify-between items-center">
        <Link href={`/`}>
          <Image
            src={`/images/logo2.png`}
            width={100}
            height={40}
            alt="logo"
            className="w-[100px] h-[40px]"
          />
        </Link>

        <div
          className="flex items-center border border-gray-300 rounded-lg focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500"
          id="search"
        >
          <input
            type="search"
            placeholder="Search something..."
            className="p-3 w-[500px] flex-1 border-none focus:outline-none"
          />
          <Magnify className="size-[30px] mx-3 text-gray-500 cursor-pointer" />
        </div>

        <div className="flex gap-x-3 items-center">
          <Link href={`/cart`}>
            <Cart className={`pointer`} />
          </Link>

          {/* User Dropdown */}
          <div
            className="size-10 rounded-full bg-gray-200 pointer relative"
            onClick={toggleDropdown}
          >
            <div
              className={`absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md ${
                isDropdownVisible ? "block" : "hidden"
              }`}
            >
              <ul className="py-2">
                <Link href={`/profile`}>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    My Account
                  </li>
                </Link>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    logOut();
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
