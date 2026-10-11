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
      message: `${data?.user?.name ?? "user"} registered successfully!`,
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
