import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeepNira ConnectX",
  description: "A Perfect Meeting web app like zoom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables:{
            colorText:'black',
            colorPrimary:'#8e50f1',
            colorBackground:'#fff',
            colorInputBackground:'#fff',
            
            
          }
        }}
      >
      <body className={`${inter.className} bg-dark-2`}>{children}</body>

      </ClerkProvider>
     
    </html>
  );
}
