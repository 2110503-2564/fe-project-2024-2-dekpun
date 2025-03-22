import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "@/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} m-0 p-0 bg-slate-100`}>
        <ReduxProvider>
          <NextAuthProvider session={session}>
            <TopMenu/>
            <div className="w-full h-[20px] bg-blue-800 mt-[70px] rounded-b-lg"></div>
            {children}
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
