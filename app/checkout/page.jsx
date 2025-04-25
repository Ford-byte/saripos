"use client";
import Cart from "@/public/icons/cart";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [checkOutItems, setCheckOutItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [overAllTotal, setOverAllTotal] = useState(0);
  useEffect(() => {
    // Retrieve checkout items from local storage
    const items = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    setCheckOutItems(items);
  }, []);
  useEffect(() => {
    // Calculate the total price of items
    const total = checkOutItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalItems(total);
  }, [checkOutItems]);

useEffect(() => {
    // Calculate the overall total
    const shipping = 10.0; // Fixed shipping cost
    const taxRate = 0.08; // 8% tax rate
    const tax = totalItems * taxRate;
    const overall = totalItems + shipping + tax;
    setOverAllTotal(overall.toFixed(2)); // Round to 2 decimal places
  }, [totalItems]);
  


  return (
    <div className="bg-gray-100 min-h-screen pt-[100px] pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <span className="text-gray-600 text-xl mr-3">
            <Cart className={`size-12`} />
          </span>
          <h1 className="text-3xl font-light text-gray-800">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing and Shipping Information */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Billing Information
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="+1 234 567 890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Shipping Address
                </label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  rows="3"
                  placeholder="123 Main Street, City, State, ZIP"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">$10.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="text-gray-800">$8.00</span>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between">
                <span className="font-medium text-gray-800">Total</span>
                <span className="font-bold text-lg text-gray-900">
                  ${overAllTotal}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Ordered */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Items Ordered
          </h2>
          <div className="space-y-4">
            {checkOutItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={item.image || "/default-image.png"}
                    alt={item.name || "Product Image"}
                    width={50}
                    height={50}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 font-medium">
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Payment Method
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Card Number
              </label>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  CVV
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="123"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-150 shadow-sm"
            >
              Pay $118.00
            </button>
          </form>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Need help with your order?</p>
          <Link
            href={`/`}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium mt-4 inline-block"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
