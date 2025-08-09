import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { Navbar } from "./components/navbar/Navbar";
import { LoginModal } from "./components/modals/LoginModal";
import { RegisterModal } from "./components/modals/RegisterModal";
import { RentModal } from "./components/modals/RentModal";

import getCurrentUser from "./actions/getCurrentUser";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${nunito.className}`}
      >
        <Toaster />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">          
          {children}
        </div>
      </body>
    </html>
  );
}
