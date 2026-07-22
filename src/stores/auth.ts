import { defineStore } from "pinia";

interface User {
  firstName: string;
  lastName: string;
  username: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("auth_token") || "",
    user: JSON.parse(localStorage.getItem("auth_user") || "{}") as User,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    login(token: string, user: User) {
      this.token = token;
      this.user = user;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
    },
    logout() {
      this.token = "";
      this.user = {} as User;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },
  },
});