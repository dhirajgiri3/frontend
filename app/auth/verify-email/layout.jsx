import localFont from "next/font/local";
import StyledComponentsRegistry from "@/app/lib/registry";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/app/Contexts/Auth/AuthContext";

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
  title: "Verify Email - Navkar Selection",
  description: "Verify your email address at Navkar Selection.",
};

export default function VerifyEmailLayout({ children }) {
  return (
    <StyledComponentsRegistry>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <ToastContainer // Move ToastContainer here and remove from the VerifyEmailPage
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AuthProvider>
      </div>
    </StyledComponentsRegistry>
  );
}
