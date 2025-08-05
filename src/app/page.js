import Banner from "../../components/Banner/Banner";
import About from "../../components/About/About";
import Plans from "../../components/Plans/Plans";
import Fitness_classes from "../../components/Fitness_classes/Fitness_classes";
import Navbar from "../../components/Navbar/Navbar";
import Contact from "../../components/Contact/Contact";
import AllReview from "../../components/AllReview/AllReview";
import Message from "../../components/Message/Message";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Banner />
      <Message receiver={1} admin={false} />
      <About />
      <Plans />
      <Fitness_classes />
      <AllReview />
      <Contact />
    </>
  );
}
