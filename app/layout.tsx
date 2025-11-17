"use client";

import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            retry: false,
            staleTime: Infinity,
          },
        },
      })
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased font-sans`}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
