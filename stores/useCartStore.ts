import { ProductType } from "@/features/products/types";
import { create } from "zustand";

export type CartItem = ProductType & {
  quantity: number;
};
interface CartStore {
  cart: CartItem[];
  // paymentMethod: '',

  addItem: (item: ProductType) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;

  clearCart: () => void;

  itemTotal: (id: string) => number;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  // ADD ITEM / INCREASE QUANTITY
  addItem: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);

      // if product already exists in cart
      if (existing) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i,
          ),
        };
      }

      // add new item
      return {
        cart: [
          ...state.cart,
          {
            ...item,
            quantity: 1,
          },
        ],
      };
    }),

  // SUBTRACT ITEM QUANTITY
  decreaseItem: (id) =>
    set((state) => ({
      cart: state.cart
        .map((i) =>
          i.id === id
            ? {
                ...i,
                quantity: i.quantity - 1,
              }
            : i,
        )
        // remove item completely if quantity becomes 0
        .filter((i) => i.quantity > 0),
    })),

  // REMOVE ITEM COMPLETELY
  removeItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ cart: [] }),

  itemTotal: (id: string) => {
    const item = get().cart.find((i) => i.id === id);

    return item ? item.price * item.quantity : 0;
  },

  total: () =>
    get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
