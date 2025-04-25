import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "font-poppins",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "MuscleGain",
  description: "Gym management website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
