import Banner from "../../components/Banner/Banner";
import About from "../../components/About/About";
import Plans from "../../components/Plans/Plans";
import Fitness_classes from "../../components/Fitness_classes/Fitness_classes";
import Contact from "../../components/Contact/Contact";
import AllReview from "../../components/AllReview/AllReview";

export default function Home() {
  return (
    <div className="px-14">
      {/* <Navbar /> */}
      <Banner />
      <About />
      <Plans />
      <Fitness_classes />
      <AllReview />
      <Contact />
    </div>
  );
}
