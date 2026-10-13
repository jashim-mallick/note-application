"use client";

import { authClient } from "@/lib/betterAuth/auth-client";
import { LogOutIcon } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

const LogOutButton = () => {
  const handleLogOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("Logout failed 👾");
        return;
      }

      toast.success("Logged out successfully 👋");

      window.location.href = "/auth/login";
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
