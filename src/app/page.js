import Image from "next/image";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import About from "../../components/About/About";
import Plans from "../../components/Plans/Plans";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <About />
      <Plans />
      <h1 className="h-screen">asdf</h1>
      <h1 className="h-screen">asdf</h1>
      <h1 className="h-screen">asdf</h1>
    </>
  );
}
