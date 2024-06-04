import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mad About Movies",
  description: "Mad about movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4080624113623119"
          crossOrigin="anonymous"></script>
        <meta property='og:image' content='' />
        <meta property='og:title' content='Mad About Movies' />
        <meta property='og:description' content='Everything movie related...' />
      </head>
      <body className={`${inter.className} bg-[color:var(--bg)]`}>
        <div className='flex flex-col h-screen bg-[color:var(--bg)]'>
          <Sidebar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
