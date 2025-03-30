"use client";

import Plus from "@/public/icons/plus";
import { useUserStore } from "@/public/store/userStore";
import { useState } from "react";
import { z } from "zod";

// Define a Zod schema for user data validation
const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
  gender: z.enum(["Male", "Female", "Other"], "Invalid gender"),
  dob: z
    .string()
    .refine(
      (date) => !isNaN(new Date(date).getTime()),
      "Invalid date of birth"
    ),
});

export default function ProfileBlock() {
  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: "",
  });
  const [errors, setErrors] = useState({});
  const { addUserDetails, user } = useUserStore();

  // Ensure user_id is retrieved from the user object
  const user_id = user?.id;

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(reader.result); // Set the uploaded image as the profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the field being edited
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate user data using Zod
    const validationResult = userSchema.safeParse(userData);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      setErrors(fieldErrors);
      return;
    }

    try {
      await addUserDetails({
        user_id,
        fullname: userData.name,
        email: userData.email,
        phone_number: userData.phone,
        gender: userData.gender,
        dob: userData.dob,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="center">
      <div className="container">
        <div className="pt-[80px] w-full h-[300px] bg-[#2E8D2B] "></div>
        <div className="flex">
          <div className="size-[200px] rounded-full pointer hover:bg-gray-200 bg-white border -translate-y-1/2 mx-[24px] flex justify-center items-center relative">
            {profile ? (
              <img
                src={profile}
                alt="Profile"
                className="size-[200px] rounded-full object-cover"
              />
            ) : (
              <div>
                <Plus className={`size-12 pointer`} />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleProfileUpload}
            />
          </div>
          <div className="text-2xl font-[600]">
            {userData.name || "Fullname"}
          </div>
        </div>
        <div className="w-full grid grid-cols-5 gap-x-[20px] h-fit">
          <div className="col-span-2 border">
            <h2 className="px-4 py-2 text-xl font-[600]">My Profile</h2>
            <form onSubmit={handleSubmit} className="px-4 py-2">
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2E8D2B] text-white rounded hover:bg-[#256b22]"
              >
                Save Changes
              </button>
            </form>
          </div>
          <div className="col-span-3 col-start-3 border h-fit">
            <h2 className="p-4 text-xl font-[600]">Settings</h2>
            <div className="p-4">
              <button className="px-4 py-2 bg-[#2E8D2B] text-white rounded hover:bg-[#256b22]">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
