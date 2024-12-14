import localFont from "next/font/local";
import "./globals.css";
import StyledComponentsRegistry from "@/app/lib/registry";
import { AuthProvider } from "./Contexts/Auth/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Navkar Selection - Home",
  description:
    "Welcome to Navkar Selection, your one-stop shop for the best quality clothes in Navsari, Gujarat.",
};

export default function RootLayout({ children }) {
  return (
    <StyledComponentsRegistry>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    </StyledComponentsRegistry>
  );
}
