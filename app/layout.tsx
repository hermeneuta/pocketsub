import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "remixicon/fonts/remixicon.css";
import Providers from "@/providers";

export const metadata: Metadata = {
  title: "Pocket",
  description: "Manage your subs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body>{children}</body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
