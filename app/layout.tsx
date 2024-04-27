import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"     /* vercel app  analyitics*/
import { SpeedInsights } from "@vercel/speed-insights/next" /* vercel app speed insights*/


import { ClerkProvider } from "@clerk/nextjs";


import '@stream-io/video-react-sdk/dist/css/styles.css';//every controls this will handles

import {Toaster} from "@/components/ui/toaster";

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
            colorBackground:'#f7f7f7',
            colorInputBackground:'#fff',
            
            
          }
        }}
      >
      <body className={`${inter.className} bg-dark-2`}>{children} <Analytics /><SpeedInsights /><Toaster/></body>

      </ClerkProvider>
     
    </html>
  );
}
