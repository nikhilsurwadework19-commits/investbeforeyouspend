import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "InvestBeforeYouSpend — Save Smart, Buy Smarter",
  description: "Set a purchase goal, build a smart savings plan, grow your money while you wait, and get matched with the best deal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
