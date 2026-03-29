import React from "react";
import Button from "../Button/Button";
import Image from "next/image";
import Link from "next/link";

const Fitness_classes = async () => {
  let classes = [];
  try {
    const data = await fetch(
      "https://gym-management-0fmi.onrender.com/fitness_classes/",
      {
        cache: "no-store",
      },
    );
    classes = await data.json();
  } catch (error) {
    console.log(error);
  }
  return (
    <section id="classes" className="py-16">
      <div className="container mx-auto lg:px-18 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-green-500">Fitness Classes</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            From high-intensity workouts to mindful practices, we offer diverse
            classes for all fitness levels and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {classes.map((classItem, index) => (
            <div
              key={index}
              className="bg-gray-800/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div
                className={`h-48 bg-gradient-to-r flex items-center justify-center`}
              >
                <Image
                  className="w-full h-full object-cover"
                  src={classItem.image}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{classItem.name}</h3>
                </div>
                <p className="text-gray-300 text-sm line-clamp-2 mb-3">
                  {classItem.description.slice(0, 100)}...
                </p>
                <Link
                  className="inline-block"
                  href={`/classes/${classItem.id}`}
                >
                  <Button>Join now</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fitness_classes;
