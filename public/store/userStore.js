import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      details: null,
      profile: null,
      isLogin: false,

      setLogin: (isLogin) => set({ isLogin }),
      setUser: (user) => set({ user }),
      setDetails: (details) => set({ details }),
      setProfile: (profile) => set({ profile }),

      logOut: () => {
        localStorage.removeItem("token");
        set({ user: null, details: null, profile: null, isLogin: false });
        toast.info("Logged out successfully.");
      },

      userLogin: async ({ username, password }) => {
        try {
          const response = await axios.post(`/api/user/login`, {
            username,
            password,
          });

          if (response?.status === 200) {
            const { token, data, message } = response.data;
            console.log("data", data);
            localStorage.setItem("token", token);

            set({ user: data, isLogin: true });

            const userDetails = await get().getUserDetails({ id: data?.id });
            if (userDetails) {
              set({ details: userDetails?.data?.data[0] });
            }

            const userProfile = await get().getUserProfile({ id: data?.id });
            if (userProfile) {
              set({ profile: userProfile?.data?.data[0] });
            }

            localStorage.setItem("role", userProfile?.data?.data[0]?.role);
            toast.success(message || "Login successful!");
          } else {
            toast.error("Login failed. Please try again.");
          }
        } catch (error) {
          toast.error(
            error?.response?.data?.message || "An error occurred during login."
          );
        }
      },

      userRegister: async ({ username, password }) => {
        try {
          const response = await axios.post(`/api/user`, {
            username,
            password,
          });

          toast.success(response?.data?.message || "Created successfully!");
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              "An error occurred during registration."
          );
        }
      },

      addUserDetails: async ({
        user_id,
        fullname,
        email,
        phone_number,
        gender,
        dob,
      }) => {
        try {
          const response = await axios.post(`/api/user/details`, {
            user_id,
            fullname,
            email,
            phone_number,
            gender,
            dob,
          });
          toast.success(
            response?.data?.message || "Details added successfully!"
          );
        } catch (error) {
          toast.error(error?.response?.data?.message || "An error occurred.");
        }
      },

      getUserDetails: async ({ id }) => {
        try {
          const response = await axios.get(
            `/api/user/details/details?id=${id}`
          );
          return response;
        } catch (error) {
          toast.error(error?.response?.data?.message || "An error occurred.");
          return null;
        }
      },

      getUserProfile: async ({ id }) => {
        try {
          const response = await axios.get(
            `/api/user/profile/profile?id=${id}`
          );
          return response;
        } catch (error) {
          toast.error(error?.response?.data?.message || "An error occurred.");
          return null;
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
