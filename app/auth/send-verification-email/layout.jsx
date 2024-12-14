import localFont from "next/font/local";
import "../../globals.css";
import StyledComponentsRegistry from "@/app/lib/registry";
import { AuthProvider } from "@/app/Contexts/Auth/AuthContext";

// Define fonts outside component to avoid hydration issues
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
  title: "Send Verification Email - Navkar Selection",
  description:
    "Send a verification email to confirm your account at Navkar Selection.",
};

export default function SendVerificationEmailLayout({ children }) {
  return (
    <StyledComponentsRegistry>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </div>
    </StyledComponentsRegistry>
  );
}
