"use client";

import Magnify from "@/public/icons/magnify";
import { useUserStore } from "@/public/store/userStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const { logOut } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  return (
    <header className="border-b shadow-md w-full fixed bg-white z-[1000] center">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/images/logo2.png"
            width={100}
            height={40}
            alt="Website Logo"
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
          <div className="relative">
            <div className="size-10 rounded-full bg-gray-200 cursor-pointer">
              <Image
                src={"/favicon.ico"}
                width={40}
                height={40}
                alt="profile"
                className="size-10 rounded-full"
              />
            </div>

            <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
              <ul className="py-2">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
