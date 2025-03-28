"use client";

import LoginForm from "@/public/components/forms/login";
import RegistrationForm from "@/public/components/forms/register";
import { useUserStore } from "@/public/store/userStore";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BannerBlock = dynamic(() =>
  import("@/public/components/block/BannerBlock")
);
const CategoryBlock = dynamic(() =>
  import("@/public/components/block/CategoryBlock")
);
const PopularProductBlock = dynamic(() =>
  import("@/public/components/block/PopularProductBlock")
);
const ProductBlock = dynamic(() =>
  import("@/public/components/block/ProductBlock")
);
export default function Home() {
  const [changeForm, setChangeForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isLogin, setLogin } = useUserStore();

  const toggleForm = () => {
    setChangeForm((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    }
    setLoading(false);
  }, [setLogin]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!isLogin) {
    return (
      <div className="flex items-center justify-center h-screen">
        {changeForm ? (
          <RegistrationForm toggleForm={toggleForm} />
        ) : (
          <LoginForm toggleForm={toggleForm} />
        )}
      </div>
    );
  }

  return (
    <h1 className="pt-[80px] text-2xl font-bold">
      <BannerBlock />
      <CategoryBlock />
      <PopularProductBlock />
      <ProductBlock />
    </h1>
  );
}
