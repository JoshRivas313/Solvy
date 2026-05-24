import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { GoalsProvider } from "@/context/GoalsContext";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Solvy — Tu futuro empieza hoy",
  description:
    "Aprende a invertir paso a paso con rutas guiadas, simulaciones y educación financiera personalizada para jóvenes.",
  keywords: ["inversión", "fintech", "ahorro", "educación financiera", "jóvenes"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#10B981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <GoalsProvider>
          {children}
        </GoalsProvider>
      </body>
    </html>
  );
}
