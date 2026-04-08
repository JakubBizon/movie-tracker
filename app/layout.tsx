import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import Footer from "@/components/Footer/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
      <body
        className={`antialiased font-sans bg-transparent dark:bg-secondary`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
