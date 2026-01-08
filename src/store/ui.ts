import { create } from 'zustand';

interface UIState {
    isSideMenuOpen: boolean;
    toggleSideMenu: () => void;
    closeSideMenu: () => void;
    openSideMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isSideMenuOpen: false,
    toggleSideMenu: () => set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
    closeSideMenu: () => set({ isSideMenuOpen: false }),
    openSideMenu: () => set({ isSideMenuOpen: true }),
}));
