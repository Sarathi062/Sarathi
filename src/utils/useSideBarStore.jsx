import { create } from "zustand";

const useSidebarStore = create((set) => ({
	sidebarOpen: true,
	setSidebarOpen: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

export default useSidebarStore;
