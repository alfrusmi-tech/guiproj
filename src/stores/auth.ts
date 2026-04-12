// src/stores/auth.ts
import { defineStore } from "pinia";

interface User {
  firstName: string;
  lastName: string;
  username: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "" as string,
    user: {} as User,
  }),
  actions: {
    login(token: string, user: User) {
      this.token = token;
      this.user = user;
    },
    logout() {
      this.token = "";
      this.user = {} as User;
    },
  },
});