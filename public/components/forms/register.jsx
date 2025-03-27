"use client";

import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useUserStore } from "@/public/store/userStore";

const formSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must match Password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function RegisterForm({ toggleForm }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { userRegister } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const validationErrors = result.error.flatten().fieldErrors;
      setErrors({
        username: validationErrors.username?.[0] || "",
        email: validationErrors.email?.[0] || "",
        password: validationErrors.password?.[0] || "",
        confirmPassword: validationErrors.confirmPassword?.[0] || "",
      });
      return;
    }

    try {
      await userRegister(formData);
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toggleForm();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 rounded-md py-4 px-8">
        <div id="logo" className="center">
          <Image
            src="/images/logo.png"
            width={200}
            height={100}
            className="w-[200px] h-[100px]"
            alt="logo"
          />
        </div>
        <form className="mt-4 grid grid-cols-2 gap-x-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className={`mt-1 p-2 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className={`mt-1 p-2 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className={`mt-1 p-2 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`mt-1 p-2 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full col-span-2 bg-[#177514] text-white py-2 px-4 rounded-md hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <p className="text-xs pt-4 text-center">
          Already have an account?{" "}
          <strong
            className="text-[#177514] hover:underline cursor-pointer"
            onClick={toggleForm}
          >
            Login
          </strong>
        </p>
      </div>
    </div>
  );
}
