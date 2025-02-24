"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      {" "}
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}{" "}
      </ThemeProvider>
    </SessionProvider>
  );
};
