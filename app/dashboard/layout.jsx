import localFont from "next/font/local";
import StyledComponentsRegistry from "@/app/lib/registry";
import { AuthProvider } from "@/app/Contexts/Auth/AuthContext";

// Move font logic here to avoid dynamic changes causing mismatches
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Dashboard - Navkar Selection",
  description: "Dashboard for Navkar Selection.",
};

export default function DashboardLayout({ children }) {
  return (
    <StyledComponentsRegistry>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </div>
    </StyledComponentsRegistry>
  );
}
