// store/useAuthStore.js
import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../lib/firebase"; // adjust path as needed

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  signIn: async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    set({ user: userCredential.user });
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      console.log("Signout successfull");
      set({ user: null });
    } catch (err) {
      console.log(err);
    }
  },
}));

// Set up listener
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, loading: false });
});
