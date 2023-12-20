import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TodoList",
  description: "TodoList app using Next js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
