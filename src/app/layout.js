import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ReduxProvider from "@/Redux/ReduxProvider";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";

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
      <body className={`${poppins.className}`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
