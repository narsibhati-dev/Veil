import type { Metadata, Viewport } from "next";
import { Raleway, Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import Providers from "./providers";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://veil.audoralabs.com"),
  title: "Veil: Private Payments on Solana",
  description: "Zero-knowledge private SOL transfers on Solana devnet. Groth16 proofs generated entirely in your browser.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Veil: Private Payments on Solana",
    description: "Zero-knowledge private SOL transfers. Shield funds, generate ZK proofs in-browser, withdraw to any address with zero on-chain link.",
    siteName: "Veil",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veil: Private Payments on Solana",
    description: "ZK private SOL transfers on Solana devnet. 100% in-browser proof generation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${nunito.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-[#0f1a16] focus:rounded-lg focus:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.12)] focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
