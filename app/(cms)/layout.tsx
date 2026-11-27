import { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";
import "../globals.css"
import {Toaster} from "sonner"
import { AdminSidebar } from "@/components/partials/AdminSidebar";
import { AdminHeader } from "@/components/partials/AdminHeader";
import { AdminFooter } from "@/components/partials/AdminFooter";
import AuthProvider from "@/lib/provider/AuthProvider";


export const metadata: Metadata = {
  title: "Admin || Dashboard Page",
  description: "This is an admin dashboard section"
}

const RobotoSans = Montserrat({
  variable: "--font-custom-sans",
  subsets: ['latin']
})
const RobotoMono = Roboto_Mono({
  variable: "--font-custom-mono",
  subsets: ['latin']
})



export default function CmsLayout({children}: LayoutProps<"/">) {
  return (
    <>
      <html
        lang="en"
        className={`${RobotoSans.variable} ${RobotoMono.variable} antialiased`}
      >
        <body className={`bg-slate-100 font-sans text-slate-900`}>
          <AuthProvider>
            <Toaster richColors closeButton />

            <section className="flex h-screen w-full overflow-hidden">
              <AdminSidebar />

              <main className="flex min-w-0 flex-1 flex-col">
                <AdminHeader />

                <section className="flex-1 overflow-y-auto">
                  <section className="mx-auto w-full p-5 flex flex-col gap-3">{children}</section>
                </section>

                <AdminFooter />
              </main>
            </section>
          </AuthProvider>
        </body>
      </html>
    </>
  );
}