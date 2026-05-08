import type { Metadata } from "next";
// Note: Outfit font loads on Vercel — remove this comment and uncomment below if needed:
// import { Outfit } from "next/font/google";
// const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "InvestBeforeYouSpend — Save Smart, Buy Smarter",
  description: "Set a purchase goal, build a smart savings plan, grow your money while you wait, and get matched with the best deal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
