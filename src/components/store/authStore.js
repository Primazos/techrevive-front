import { create } from "zustand";
import axios from "axios";
import API from "../../db/conn";

const useAuthStore = create((set) => ({
  userId: null,
  user: null,
  isAuthenticated: false,

  login: async (formData) => {
    try {
      const response = await axios.post(`${API}/api/users/login`, formData);

      if (response.data) {
        set({
          userId: response.data.userId,
          isAuthenticated: true,
        });
        localStorage.setItem("userId", response.data.userId);

        await useAuthStore.getState().fetchUser(response.data.userId);
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error(
        "Error en el login:",
        error.response?.data || error.message
      );
      console.error(
        "Error en el login:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  logout: () => {
    set({ userId: null, user: null, isAuthenticated: false });
    localStorage.removeItem("userId");
  },

  fetchUser: async (userId) => {
    try {
      const response = await axios.get(`${API}/api/users/get-user/${userId}`);
      set({ user: response.data });
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    }
  },

  updateUser: (updatedUser) => {
    set({ user: updatedUser });
  },

  loadUserFromStorage: async () => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      set({ userId: storedUserId, isAuthenticated: true });

      await useAuthStore.getState().fetchUser(storedUserId);
    }
  },
}));

export default useAuthStore;