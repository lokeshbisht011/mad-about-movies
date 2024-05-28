import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mad About Movies",
  description: "Mad about movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property='og:image' content='' />
        <meta property='og:title' content='Test title' />
        <meta property='og:description' content='Test Description' />
      </head>
      <body className={inter.className}>
        <div className="bg-[color:var(--bg)]">
          {/* <Sidebar /> */}
          {children}
        </div>
      </body>
    </html>
  );
}
