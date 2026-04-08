import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site/site-shell";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL &&
  /^https?:\/\//.test(process.env.NEXT_PUBLIC_SITE_URL)
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "http://localhost:3000";

export const metadata: Metadata = {
  title:
    "Portfolio Mohamed SARE - Développeur Web Full-Stack, IA et Cybersécurité | Burkina Faso & Maroc",
  description:
    "Portfolio officiel de Mohamed SARE — Développeur Web, Intelligence Artificielle et Cybersécurité.",
  metadataBase: new URL(siteUrl),
};

export const viewport: Viewport = {
  themeColor: "#6c63ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <link rel="icon" type="image/svg+xml" href="/img/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-mode');
      if (document.body) document.body.classList.add('light-mode');
    }
  } catch (e) {}
})();`,
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen antialiased`}
        style={{ overflow: "hidden" }}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
