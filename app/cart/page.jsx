"use client";
import Cart from "@/public/icons/cart";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Headphones",
      price: 199.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "Wireless Keyboard",
      price: 89.99,
      quantity: 2,
      image: "/api/placeholder/80/80",
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 249.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const shipping = 10.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-200 min-h-screen pt-[100px] pb-12 center">
      <div className="container">
        <div className="flex items-center mb-8">
          <span className="text-gray-600 text-xl mr-3">
            <Cart className={`size-12`} />
          </span>
          <h1 className="text-3xl font-light text-gray-800">Your Cart</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Cart Header */}
          <div className="bg-gray-50 border-b px-6 py-4">
            <h2 className="text-lg font-medium text-gray-700">
              Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="px-6 py-6 flex flex-col sm:flex-row sm:items-center"
              >
                <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md bg-gray-100"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Unit Price: ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center mt-4 sm:mt-0">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="px-3 py-1 text-gray-500 hover:text-gray-700 font-medium"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 text-gray-500 hover:text-gray-700 font-medium"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-6 text-right">
                    <p className="font-medium text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="text-sm text-red-500 hover:text-red-700 mt-1"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 px-6 py-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="text-gray-800">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between">
                <span className="font-medium text-gray-800">Total</span>
                <span className="font-bold text-lg text-gray-900">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="px-6 py-6 border-t border-gray-200">
            <button className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-150 shadow-sm">
              <span className="mr-2">💳</span>
              Proceed to Checkout
            </button>
            <p className="text-xs text-center text-gray-500 mt-4">
              Secure checkout powered by Stripe. All transactions are encrypted.
            </p>
          </div>
        </div>

        {/* Continue Shopping Link */}
        <div className="mt-8 text-center">
          <Link
            href={`/`}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
