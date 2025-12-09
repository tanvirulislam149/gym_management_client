import React from "react";
import { FaDumbbell, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";

const About = () => {
  const features = [
    {
      icon: <GiWeightLiftingUp className="text-2xl" />,
      title: "Modern Equipment",
      description:
        "State-of-the-art fitness technology from leading brands for optimal workouts.",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Expert Trainers",
      description:
        "Certified professionals providing personalized guidance and motivation.",
    },
    {
      icon: <FaCalendarAlt className="text-2xl" />,
      title: "Flexible Schedule",
      description: "24/7 access with diverse class times to fit any lifestyle.",
    },
  ];

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-green-500">PrimeFit</span>?
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            We offer not only a gym but also a comprehensive fitness ecosystem
            with personalized training, nutrition planning and community
            support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full inline-block mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-bold text-green-500">15+</div>
            <div className="text-gray-300">Expert Trainers</div>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-bold text-green-500">60+</div>
            <div className="text-gray-300">Weekly Classes</div>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-bold text-green-500">24/7</div>
            <div className="text-gray-300">Open Hours</div>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-2xl">
            <div className="text-4xl font-bold text-green-500">4.9</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
