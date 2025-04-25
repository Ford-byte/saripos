"use client";

import { useProductStore } from "@/public/store/productStore";
import { useCartStore } from "@/public/store/useCartStore"; // Import the cart store
import Image from "next/image";
import { useEffect } from "react";

export default function ProductBlock() {
  const { getProducts, products } = useProductStore();
  const { cart, setCart } = useCartStore(); // Access cart and setCart from the cart store

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (product) => {
    const updatedCart = cart ? [...cart] : [];
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if product already exists
    } else {
      updatedCart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }

    setCart(updatedCart); // Update the cart in the store
  };

  return (
    <div className="center mb-8">
      <div className="container">
        <div className="center relative bg-gray-200 mb-6">
          <div className="w-full h-[20px] bg-[#2E8D2B] absolute"></div>
          <h2 className="text-2xl font-[700] text-[#2E8D2B] capitalize pt-6 pb-2">
            our top products
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-4 h-fit">
          {products && products.length > 0 ? (
            products.map((item) => {
              return (
                <div
                  key={item.id}
                  className="relative min-h-[250px] justify-center shadow-lg border-gray-200 rounded-lg border text-center flex items-center flex-col"
                >
                  <Image
                    src={item.image}
                    width={100}
                    height={50}
                    alt={item.name}
                    className="min-w-[100px] max-h-[100px] object-fill mb-2"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.price}</p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => addToCart(item)} // Add to cart on button click
                        className="text-xs my-2 border py-2 w-fit px-2 capitalize text-[#2E8D2B] border-gray-300 hover:border-[#2E8D2B] pointer rounded-lg"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 col-span-4">
              No products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
