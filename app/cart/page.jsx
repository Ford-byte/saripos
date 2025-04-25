"use client";
import Cart from "@/public/icons/cart";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCartStore } from "@/public/store/useCartStore";
import Image from "next/image";

export default function Page() {
  const { cart, setCart } = useCartStore();

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    console.log("newQuantity", newQuantity);
    setCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const { subtotal, tax, total } = useMemo(() => {
    const subtotal =
      cart?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
    const tax = subtotal * 0.08;
    const shipping = 10.0; // Can be dynamic
    const total = subtotal + shipping + tax;
    return { subtotal, tax, total };
  }, [cart]);

  // Helper function to ensure two decimal places, prevent NaN
  const formatCurrency = (value) => {
    if (isNaN(value)) return "0.00";
    return value.toFixed(2);
  };

  const [CheckItems, setCheckItems] = useState([]);

  const handleCheckboxChange = (id) => {
    setCheckItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isChecked = (id) => CheckItems.includes(id);

  const checkOut = () => {
    // Filter the selected items from the cart
    const selectedItems = cart.filter((item) => CheckItems.includes(item.id));

    // Save the selected items to local storage
    localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));

    // Redirect to the checkout page
    console.log("Selected items saved to local storage:", selectedItems);
  };

  return (
    <div className="bg-gray-200 min-h-screen pt-[100px] pb-12 center">
      <div className="container">
        <div className="flex items-center mb-8">
          <span className="text-gray-600 text-xl mr-3">
            <Cart className={`size-12`} />
          </span>
          <h1 className="text-3xl font-light text-gray-800">Your Cart</h1>
        </div>

        {cart?.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Cart Header */}
            <div className="bg-gray-50 border-b px-6 py-4">
              <h2 className="text-lg font-medium text-gray-700">
                Items ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="px-6 py-6 flex flex-col sm:flex-row sm:items-center"
                >
                  <input
                    type="checkbox"
                    name={`item-${item.id}`}
                    className="mx-[12px] size-[16px]"
                    id={`item-${item.id}`}
                    checked={isChecked(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                    <Image
                      src={item.image || "/default-image.png"}
                      alt={item.name || "Product Image"}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md bg-gray-100"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Unit Price: ${formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        className="px-3 py-1 text-gray-500 hover:text-gray-700 font-medium"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-1 text-gray-500 hover:text-gray-700 font-medium"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="font-medium text-gray-800">
                        ${formatCurrency(item.price * item.quantity)}
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
            <div className="px-6 py-4 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={CheckItems.length === cart.length && cart.length > 0}
                onChange={() =>
                  setCheckItems(
                    CheckItems.length === cart.length
                      ? []
                      : cart.map((item) => item.id)
                  )
                }
              />
              <span className="text-gray-700 text-sm">Select All</span>
            </div>
            {/* Order Summary */}
            <div className="bg-gray-50 px-6 py-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">
                    ${formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="text-gray-800">${formatCurrency(tax)}</span>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between">
                  <span className="font-medium text-gray-800">Total</span>
                  <span className="font-bold text-lg text-gray-900">
                    ${formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              className="px-6 py-6 border-t border-gray-200"
              href={`/checkout`}
              onClick={checkOut}
            >
              <button className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-150 shadow-sm">
                <span className="mr-2">💳</span>
                Proceed to Checkout
              </button>
              <p className="text-xs text-center text-gray-500 mt-4">
                Secure checkout powered by Stripe. All transactions are
                encrypted.
              </p>
            </Link>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
            <Link
              href={`/`}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium mt-4 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
