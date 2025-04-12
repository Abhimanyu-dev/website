// components/SignOutRedirect.js
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function SignOutRedirect() {
  const signOut = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

  useEffect(() => {
    const doSignOut = async () => {
      await signOut();
      navigate("/authentication/sign-in", { replace: true });
    };
    doSignOut();
  }, [signOut, navigate]);

  return <div>Signing out...</div>;
}
