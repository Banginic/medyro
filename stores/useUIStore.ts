import { persist } from "zustand/middleware";
import { create } from "zustand";

interface DeleteType {
  endpoint: string;
  title: string;
  method: string;
  redirect?: string;
}
type UIState = {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;

  language: string;
  setLanguage: (lang: string) => void;

  deleteDetails: DeleteType | null;
  deleteDialogueOpen: boolean;
  openDeleteDialogue: (details: DeleteType) => void;
  closeDeleteDialogue: () => void;

  closeAll: () => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      cartOpen: false,

      openCart: () => set({ cartOpen: true }),
      closeCart: () => set({ cartOpen: false }),

      sidebarOpen: false,
      openSidebar: () => set({ sidebarOpen: true }),
      closeSidebar: () => set({ sidebarOpen: false }),

      language: "en",
      setLanguage: (lang) =>
        set({
          language: lang,
        }),

      // DELETE DIALOGUE------------------------------------------------------------------------------------------
      deleteDetails: null,
      deleteDialogueOpen: false,
      openDeleteDialogue: (deleteDetails) =>
        set({ deleteDetails, deleteDialogueOpen: true }),
      closeDeleteDialogue: () =>
        set({ deleteDetails: null, deleteDialogueOpen: false }),

      closeAll: () =>
        set({
          cartOpen: false,
        }),
    }),
    {
      name: "ui-store",
      partialize: (state) => ({
        language: state.language,
        sidebarOpen: state.sidebarOpen,
      }),
    },
  ),
);
