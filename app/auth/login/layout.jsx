import localFont from "next/font/local";
import "../../globals.css";
import StyledComponentsRegistry from "@/app/lib/registry";
import { AuthProvider } from "@/app/Contexts/Auth/AuthContext";
const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Login - Navkar Selection",
  description: "Login to your account at Navkar Selection.",
};

export default function LoginLayout({ children }) {
  return (
    <StyledComponentsRegistry>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </div>
    </StyledComponentsRegistry>
  );
}
