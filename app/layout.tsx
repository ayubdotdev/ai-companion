import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/Theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Analytics } from "@vercel/analytics/next"

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
    <html lang="en" suppressHydrationWarning >
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ClerkProvider appearance={{ variables:{colorPrimary:'#fe5933'}}}>
          <Navigation />
          <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            <div className="fixed top-20 right-4 z-50">
              <ModeToggle className="rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm" />
            </div>
            {children} 
            <Analytics/>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}


