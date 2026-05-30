import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Veil: Private Payments on Solana",
    short_name: "Veil",
    description: "Zero-knowledge private SOL transfers on Solana devnet",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#599F8A",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
