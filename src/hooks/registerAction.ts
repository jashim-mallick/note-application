import { authClient } from "@/lib/betterAuth/auth-client";
import { RegisterType } from "@/lib/types";

const registerAction = async ({ name, email, password }: RegisterType) => {
  try {
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: true,
      message:
        "Registration request received. If this email is not already in use, your account is ready.",
    };
  } catch (error) {
    console.error("Signup error:", error);

    return {
      success: false,
      message: "Error registering user 👾",
    };
  }
};

export default registerAction;
