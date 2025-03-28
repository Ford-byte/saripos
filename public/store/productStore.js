import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set) => ({
      products: null, // State to store product categories

      // Function to set products in the state
      setProduct: (products) => set({ products }),

      // Function to fetch product categories from the API
      getProductCategory: async () => {
        try {
          const response = await axios.get(`/api/category`);
          return response;
        } catch (error) {
          console.error("Error fetching product categories:", error);
          toast.error("Failed to fetch product categories. Please try again.");
        }
      },

      getProducts: async () => {
        try {
          const response = await axios.get(`/api/product`);
          set((state) => ({ products: response.data.data }));
          return response.data.data;
        } catch (error) {
          console.error("Error fetching products:", error);
          toast.error("Failed to fetch products. Please try again.");
        }
      },
    }),
    {
      name: "product-storage", // Name of the storage key
    }
  )
);
