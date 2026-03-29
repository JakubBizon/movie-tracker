import { create } from "zustand";

type NavbarStore = {
  isSearchVisible: boolean;
  setSearchVisible: (visible: boolean) => void;
};

export const useNavbarStore = create<NavbarStore>((set) => ({
  isSearchVisible: false,
  setSearchVisible: (v) => set({ isSearchVisible: v }),
}));
