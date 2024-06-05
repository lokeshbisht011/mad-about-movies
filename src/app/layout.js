import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mad About Movies",
  description: "Mad about movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_TAG}`}
        />

        <Script id="ga-script" strategy="lazyOnload">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.GOOGLE_ANALYTICS_TAG}'
    });
        `}
        </Script>


        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4080624113623119"
          crossOrigin="anonymous"></Script>
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
