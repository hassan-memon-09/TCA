// store/useChatStore.js
import { create } from "zustand";

export const useChatStore = create((set) => ({
  selectedUser: null,
  messages: [],
  setSelectedUser: (user) => set({ selectedUser: user, messages: [] }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setMessages: (msgs) => set({ messages: msgs }), // ✅ added this
}));
