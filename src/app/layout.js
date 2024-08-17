import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auto Store",
  description: "Auto Store es una tienda en línea de autopartes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
