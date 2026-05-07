import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    { name: 'app-store' }
  )
);
