import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      details: null,
      isLogin: false,

      setLogin: (isLogin) => set({ isLogin }),
      setUser: (user) => set({ user }),
      setDetails: (details) => set({ details }),

      logOut: () => {
        localStorage.removeItem("token");
        set({ user: null, isLogin: false });
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

            localStorage.setItem("token", token);

            set({ user: data[0], isLogin: true });

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
              "An error occurred during register."
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
          toast.success(response?.data?.message);
        } catch (error) {
          toast.error(error?.response?.data?.message || "An error occurred.");
        }
      },

      getUserDetails : async ({}) => {
        
      }
    }),
    {
      name: "user-storage",
    }
  )
);
