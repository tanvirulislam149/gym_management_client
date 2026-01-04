import Image from "next/image";
import React from "react";
import Available_class from "../../../../components/Available_class/Available_class";
import Reviews from "../../../../components/Reviews/Reviews";

const ClassDetails = async ({ params }) => {
  const { id } = await params;
  const data = await fetch(
    `https://gym-management-0fmi.onrender.com/fitness_classes/${id}`
  );
  const fitness_class = await data.json();
  return (
    <div className="min-h-screen mx-5 lg:mx-20 p-2 lg:p-10">
      <div className="lg:flex">
        <div className="lg:w-4/6">
          <Image
            className="w-full"
            src={fitness_class.image}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <div className="lg:w-2/6 w-full border border-gray-700 lg:mx-10 mt-5 lg:mt-0">
          <Available_class id={fitness_class.id} />
        </div>
      </div>
      <div className="py-10">
        <p className="text-3xl font-bold my-4">{fitness_class.name}</p>
        <hr />
        <p className="pt-5">{fitness_class.description}</p>
        <Reviews id={fitness_class.id} />
      </div>
    </div>
  );
};

export default ClassDetails;
