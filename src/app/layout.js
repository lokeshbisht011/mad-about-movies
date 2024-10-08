import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Script from "next/script";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";

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
    gtag('config', '${process.env.GOOGLE_ANALYTICS_TAG}')
        `}
        </Script>

        {/* <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4080624113623119"
          crossOrigin="anonymous"
        ></Script> */}
        <meta property="og:image" content="" />
        <meta property="og:title" content="Mad About Movies" />
        <meta property="og:description" content="Everything movie related..." />
      </head>
      <body className={`${inter.className} bg-bg`}>
        <div className="flex flex-col h-screen bg-bg">
          <Navbar />
          {/* <ThemeToggle /> */}
          {children}
          <Footer />
          <Script id="infolinks-script" strategy="afterInteractive">
            {`
            var infolinks_pid = 3425935; 
            var infolinks_wsid = 1;
          `}
          </Script>
          <Script
            strategy="afterInteractive"
            src="//resources.infolinks.com/js/infolinks_main.js"
          />
        </div>
      </body>
    </html>
  );
}
