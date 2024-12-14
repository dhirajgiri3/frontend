import localFont from "next/font/local";
import StyledComponentsRegistry from "@/app/lib/registry";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Move font logic here to avoid dynamic changes causing mismatches
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
  title: "Verify Phone - Navkar Selection",
  description:
    "Verify your phone number to complete your registration at Navkar Selection.",
};

export default function VerifyPhoneLayout({ children }) {
  return (
    <StyledComponentsRegistry>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </div>
    </StyledComponentsRegistry>
  );
}
