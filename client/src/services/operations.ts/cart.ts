import { toast } from "sonner";
import { cartEndpoint } from "../api";
import { apiConnector } from "../apiConnector";

const { addToCart, getAllCartItems } = cartEndpoint;

interface CartInfo {
  itemId: string;
  image: string;
  name: string;
  price: number;
}

export const cart = async ({ itemId, image, name, price }: CartInfo) => {
  try {
    const response = await apiConnector(
      "POST",
      addToCart,
      { itemId, image, name, price }
    );

    if (!response?.data?.success) {
      toast.error(response?.data?.message || "Failed to add item to cart");
      return null;
    }

    toast.success("Item added to cart");
    return response.data;
  } catch (error: any) {
    console.error("ADD TO CART ERROR:", error);

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    toast.error(message);
    return null;
  }
};


export const getCartItems = async () => {
  try {
    const response = await apiConnector(
      "GET",
      getAllCartItems,
    );

    if (!response?.data?.success) {
      toast.error(response?.data?.message || "Failed to get all item from cart");
      return null;
    }
    return response.data;
  } catch (error: any) {
    console.error("GET ALL CART ITEMS ERROR:", error);

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    toast.error(message);
    return null;
  }
};

