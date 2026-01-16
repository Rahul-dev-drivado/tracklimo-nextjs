import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider, ThemeProvider } from "@/components/providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tracklimo",
  description: "Dashboard for managing your Chauffeurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClassName = `${plusJakartaSans.variable} block font-sans antialiased`;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bodyClassName} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
