// providers/Providers.tsx
"use client";

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/services/store/store";
import { NextIntlClientProvider } from "next-intl";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkersRegister";
import { PWAInstallButton } from "@/components/pwa/pwa-install-button";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider"; // update path if needed
import Nav from "@/components/layouts/nav";

type Props = {
    children: React.ReactNode;
    locale: string;
    messages: Record<string, any>;
};

export default function Providers({ children, locale, messages }: Props) {
    return (
        <ReduxProvider store={store}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ServiceWorkerRegister />
                    <Nav />
                    {children}
                    <PWAInstallButton />
                    <Toaster />
                </ThemeProvider>
            </NextIntlClientProvider>
        </ReduxProvider>
    );
}
