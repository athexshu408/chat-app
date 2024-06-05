import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";
import { userStore } from "./userStore";

export const usechatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },

  changeChat: (chatId, user) => {
    const currentuser = userStore.getState().currentuser;

    if (user.blocked.includes(currentuser.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

   else if (currentuser.blocked.includes(user.id)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }
    else{

      
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      });
    }
  },
}));
