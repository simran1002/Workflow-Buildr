import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const Toaster = dynamic(
  () => import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Workflow Builder Lite",
  description: "AI-native workflow automation for text processing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-[var(--background)] text-[var(--foreground)]">
        <ThemeProvider>
          <Nav />
          <main className="container mx-auto px-4 py-8 max-w-6xl">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
