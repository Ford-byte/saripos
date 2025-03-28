"use client";

import Facebook from "@/public/icons/facebook";
import Instagram from "@/public/icons/insta";
import LinkedIn from "@/public/icons/linkedin";
import Twitter from "@/public/icons/twitter";
import { useUserStore } from "@/public/store/userStore";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { href: "/", icon: <Facebook className="size-6" />, label: "Facebook" },
    { href: "/", icon: <Instagram className="size-6" />, label: "Instagram" },
    { href: "/", icon: <Twitter className="size-6" />, label: "Twitter" },
    { href: "/", icon: <LinkedIn className="size-6" />, label: "LinkedIn" },
  ];

  const { isLogin } = useUserStore();

  if (!isLogin) {
    return <div></div>;
  }

  return (
    <footer className="center">
      <div className="container my-4 py-4 w-full">
        <div className="border-t border-gray-200 flex flex-wrap justify-between w-full py-4">
          {/* Social Media Links */}
          <nav
            className="flex flex-col space-y-[10px]"
            aria-label="Social Media Links"
          >
            <h2 className="text-lg font-bold">FOLLOW US</h2>
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex space-x-[10px]"
                aria-label={`Follow us on ${link.label}`}
              >
                <div>{link.icon}</div>
                <div className="font-[600]">@Saripos</div>
              </Link>
            ))}
          </nav>

          {/* About Us Section */}
          <div className="space-y-[10px] max-w-[800px]">
            <h2 className="text-lg font-bold">ABOUT US</h2>
            <p>
              Saripos is a leading e-commerce platform dedicated to providing an
              exceptional online shopping experience. With a vast selection of
              high-quality products across various categories, we strive to
              offer convenience, value, and customer satisfaction. Our
              user-friendly website, secure payment options, and fast delivery
              services ensure that your shopping journey is smooth and
              enjoyable. Whether you're looking for the latest trends, everyday
              essentials, or unique finds, Saripos is your one-stop shop for all
              your online shopping needs.
            </p>
          </div>

          {/* Logo Section */}
          <div className="flex items-center">
            <Link href={`/`}>
              <Image
                src="/images/logo2.png"
                width={100}
                height={100}
                alt="Saripos company logo"
                className="w-[100px] h-[100px] pointer"
              />
            </Link>
          </div>
        </div>
        <div className=" py-4 text-lg font-[600] capitalize">
          <h2>@2025 Saripos. All right reserved.</h2>
        </div>
      </div>
    </footer>
  );
}
