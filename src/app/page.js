import Image from "next/image";
import Navbar from "../../components/Navbar/Navbar";
import Banner from "../../components/Banner/Banner";
import About from "../../components/About/About";
import Plans from "../../components/Plans/Plans";
import Fitness_classes from "../../components/Fitness_classes/Fitness_classes";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <About />
      <Plans />
      <Fitness_classes />
      <h1 className="h-screen">asdf</h1>
      <h1 className="h-screen">asdf</h1>
      <h1 className="h-screen">asdf</h1>
    </>
  );
}
