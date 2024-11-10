import { create } from "zustand";

interface IAuthToken {
  username: string;
  token: string;
  userId: number
}

type Store = {
  auth: IAuthToken | null;
  signin: (user: IAuthToken) => void;
  logout: () => void;
};

export const useStore = create<Store>()((set) => ({
  auth: null,
  signin: (user) => set({ auth: user }),
  logout: () => set({ auth: null }),
}));
