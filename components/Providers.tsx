"use client";

import { AuthProvider } from "@/hooks/useAuth";
import { DarkModeProvider } from "@/hooks/useDarkMode";
import { TranslationProvider } from "@/hooks/useTranslation";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TranslationProvider>
      <DarkModeProvider>
        <AuthProvider>{children}</AuthProvider>
      </DarkModeProvider>
    </TranslationProvider>
  );
};

