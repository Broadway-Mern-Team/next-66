import { Metadata } from "next";
import { Roboto_Mono, Roboto_Serif } from "next/font/google";
import "../globals.css"
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin || Dashboard Page",
  description: "This is an admin dashboard section"
}

const RobotoSans = Roboto_Serif({
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
      <html>
        <body className={`${RobotoSans.variable} ${RobotoMono.variable} flex w-full h-screen`}>
          
          <aside className="w-80 p-5 bg-gray-100">
            <p>Logo</p>

            <nav>
              <ul>
                <li><Link href="/admin/banner">Banner Manage</Link></li>
              </ul>
            </nav>
          </aside>
          
          <main className="w-full flex flex-col">
            <header>Dashboard Header</header>
            <section>{children}</section>
          </main>
        </body>
      </html>
    </>
  );
}