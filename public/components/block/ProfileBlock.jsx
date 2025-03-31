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
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: "",
  });
  const [errors, setErrors] = useState({});
  const { addUserDetails, user, profile, details } = useUserStore();

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
    <div className="max-w-screen-xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Banner Area */}
        <div className="h-[240px] bg-gradient-to-r from-emerald-600 to-green-500"></div>

        {/* Profile Section */}
        <div className="px-8 pb-8">
          <div className="flex items-end -mt-16 mb-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="h-[160px] w-[160px] rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center overflow-hidden">
                {profile ? (
                  <img
                    src={profile?.image}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-50 h-full w-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Plus className="h-10 w-10 text-gray-500" />
                  </div>
                )}
                {!profile && (
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleProfileUpload}
                  />
                )}
              </div>
            </div>

            {/* User Name */}
            <div className="ml-6 pb-4">
              <h1 className="text-2xl font-semibold text-gray-800 capitalize">
                {details?.fullname || "User Profile"}
              </h1>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Form - Only show if details don't exist */}
            {!details && (
              <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
                <div className="border-b border-gray-200">
                  <h2 className="px-6 py-4 text-lg font-semibold text-gray-800">
                    My Profile
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.gender}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={userData.dob}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      />
                      {errors.dob && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dob}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Settings Panel */}
            <div
              className={`${
                details ? "lg:col-span-3" : "lg:col-span-1"
              } bg-white rounded-lg border border-gray-200`}
            >
              <div className="border-b border-gray-200">
                <h2 className="px-6 py-4 text-lg font-semibold text-gray-800">
                  Settings
                </h2>
              </div>

              <div className="p-6">
                <button className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
