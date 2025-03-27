"use client";

import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { useUserStore } from "@/public/store/userStore";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginForm({ toggleForm }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const { userLogin } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const validationErrors = result.error.flatten().fieldErrors;
      setErrors({
        username: validationErrors.username?.[0] || "",
        password: validationErrors.password?.[0] || "",
      });
      return;
    }

    try {
      await userLogin(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({ username: "", password: "" });
      router.push(`/`);
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
        <div id="logo">
          <Image
            src="/images/logo.png"
            width={200}
            height={100}
            className="w-[200px] h-[100px]"
            alt="logo"
          />
        </div>
        <form className="mt-4" onSubmit={handleSubmit} action={`/`}>
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
              className={`mt-1 p-2 block w-full rounded-md shadow-sm   sm:text-sm ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
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
              className={`mt-1 p-2 block w-full rounded-md shadow-sm   sm:text-sm ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#177514] hover:cursor-pointer text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2  focus:ring-offset-2"
          >
            Submit
          </button>
        </form>

        <p className="text-xs pt-4">
          Don't have an account?{" "}
          <strong
            className="text-[#177514] hover:underline cursor-pointer"
            onClick={toggleForm}
          >
            Create Account
          </strong>
        </p>
      </div>
    </div>
  );
}
