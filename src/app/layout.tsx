import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import { AdminToggle } from "@/components/AdminToggle";
import { Footer } from "@/components/Footer";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "Travel Board",
    template: "%s | Travel Board",
  },
  description: "Our travel bucket list",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✈️</text></svg>",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Travel Board",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased px-5 py-10`}>
        <AdminProvider>
          <AdminToggle />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}
