import { authClient } from "@/lib/betterAuth/auth-client";
import { LogInType } from "@/lib/types";

const logInAction = async ({ email, password, rememberMe }: LogInType) => {
  try {
    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: true,
      message: "Logged in successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
};

export default logInAction;
