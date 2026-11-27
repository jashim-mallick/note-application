"use client";

import { authClient } from "@/lib/betterAuth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useState } from "react";
import { Button } from "../shadcnui/button";
import LogoutIcon from "../shadcnui/logout-icon";

const LogOutButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variant="ghost"
      size="sm"
      className="bg-muted text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive justify-center gap-2">
      LogOut
      <LogoutIcon isHovered={isHovered} />
    </Button>
  );
};

export default LogOutButton;
