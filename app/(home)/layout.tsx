import type { Metadata } from "next";
import "../globals.css";
import { Bricolage_Grotesque } from "next/font/google";
import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";
import { Toaster } from "sonner";
import AuthProvider from "@/lib/provider/AuthProvider";
import Chatbot from "@/components/partials/Chatbot";

const bricolageSans = Bricolage_Grotesque({
  variable: "--font-custom-sans",
  subsets: ['latin']
})

const bricolageMono = Bricolage_Grotesque({
  variable: "--font-custom-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-com Homepage",
  description: "This is the platform where you will get all kind of services and goods you are looking for."
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolageSans.variable} ${bricolageMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">
        <AuthProvider>
          <Toaster richColors closeButton />
          <Header />
          
          {children}
          
          <Chatbot />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
