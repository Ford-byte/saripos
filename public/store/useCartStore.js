import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: null,

      setCart: (newCart) => set({ cart: newCart }),

      getCart: async (userId) => {
        try {
          const response = await axios.get(`/api/cart?id=${userId}`);
          if (response?.data?.data) {
            set({ cart: response.data.data });
          } else {
            throw new Error("Invalid response format");
          }
        } catch (error) {
          toast.error("An error occurred while fetching the cart.");
        }
      },

      addCart: async (userId, cart) => {
        try {
          await axios.post(`/api/cart`, { userId, cart });
          set({ cart });
        } catch (error) {
          toast.error("An error occurred while adding the cart.");
        }
      },

      clearCart: () => {
        set({ cart: null });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
