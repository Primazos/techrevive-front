import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: async (userId, product, quantity = 1) => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId: product._id, quantity }),
      });
      const updatedCart = await res.json();
      set({ cart: updatedCart.items });
    } catch (error) {
      console.error("Error al agregar al carrito", error);
    }
  },
  removeFromCart: async (userId, productId) => {
    try {
      await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      set((state) => ({ cart: state.cart.filter((item) => item.productId !== productId) }));
    } catch (error) {
      console.error("Error al eliminar del carrito", error);
    }
  },
  fetchCart: async (userId) => {
    try {
      const res = await fetch(`/api/cart/${userId}`);
      const data = await res.json();
      set({ cart: data.items });
    } catch (error) {
      console.error("Error al obtener el carrito", error);
    }
  },
}));
