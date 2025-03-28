"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useProductStore } from "@/public/store/productStore";
import { useEffect, useState } from "react";

export default function CategoryBlock() {
  const { getProductCategory } = useProductStore();
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getProductCategory();
      const categoryData = Array.isArray(response?.data?.data)
        ? response.data.data
        : [];
      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching product categories:", error);
      setError("Failed to load categories. Please try again later.");
    }
  };

  return (
    <div className="center mb-8">
      <div className="container shadow p-4">
        <h2 className="text-2xl font-[700] text-[#2E8D2B]">Shop by Category</h2>
        {error ? (
          <p className="text-red-500 mt-4">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500 mt-4">No categories available.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
            className="mt-4"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="categorys-item text-center bg-gray-200 pointer relative">
                  <img
                    src={category.image}
                    alt={category.category}
                    className="w-full h-24 object-cover rounded"
                  />
                  <h3 className="mt-2 text-lg font-bold absolute z-[20] bottom-0 center bg-black/50 text-white capitalize leading-[20px]">
                    {category.category}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
