"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps } from "react";
import ToastProvider from "./ToastProvider";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}>
      {children}

      <ToastProvider />
      {/* <Toaster
        richColors
        position="top-right"
      /> */}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
