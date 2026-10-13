"use client";

import { authClient } from "@/lib/betterAuth/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // ← add this
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

const LogOutButton = () => {
  const router = useRouter(); // ← add this

  const handleLogOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Logout failed 👾");
        return;
      }

      router.push("/auth/login?loggedOut=true");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed 👾");
    }
  };

  return (
    <Button
      onClick={handleLogOut}
      variant="destructive"
      size="sm"
      className="cursor-pointer">
      Log Out <LogOutIcon />
    </Button>
  );
};

export default LogOutButton;
