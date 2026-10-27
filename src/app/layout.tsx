import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/geist-mono/400.css";
import "./globals.css";
import { themeBootstrap } from "@/lib/theme";
import { unsavedNavigationBootstrap } from "@/lib/unsaved-navigation";

export const metadata: Metadata = {
  title: {
    default: "Assessment workspace",
    template: "%s | Assessment workspace",
  },
  description:
    "A consultant-led leadership assessment prototype using synthetic examples.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script
          dangerouslySetInnerHTML={{ __html: unsavedNavigationBootstrap }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
