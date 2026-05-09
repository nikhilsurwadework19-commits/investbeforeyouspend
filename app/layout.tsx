import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import SpaceBackground from "@/components/SpaceBackground";
import GlobalCursor from "@/components/GlobalCursor";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "InvestBeforeYouSpend — Save Smart, Buy Smarter",
  description: "Set a purchase goal, grow your savings in the right investments, and get matched with the best deal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ background: "#050818", color: "#fff", overflowX: "hidden" }}>
        <AuthProvider>
          <SmoothScroll>
            <SpaceBackground />
            <GlobalCursor />
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
