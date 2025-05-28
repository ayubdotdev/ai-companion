import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "EduNova - AI Learning Companions",
  description: "Transform your learning journey with AI-powered companions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ClerkProvider appearance={{ variables:{colorPrimary:'#fe5933'}}}>
          <Navigation />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
