import Image from "next/image";
import React from "react";
import Available_class from "../../../../components/Available_class/Available_class";

const ClassDetails = async ({ params }) => {
  const { id } = await params;
  const data = await fetch(`http://127.0.0.1:8000/fitness_classes/${id}`);
  const fitness_class = await data.json();
  return (
    <div className="min-h-screen mx-5 lg:mx-20 p-2 lg:p-10">
      <div className="flex">
        <div className="w-4/6">
          <Image
            className="w-full"
            src={fitness_class.image}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <div className="w-2/6 border border-gray-700 mx-10">
          <Available_class id={fitness_class.id} />
        </div>
      </div>
      <div className="py-10">
        <p className="text-3xl font-bold my-4">{fitness_class.name}</p>
        <hr />
        <p className="pt-5">{fitness_class.description}</p>
      </div>
    </div>
  );
};

export default ClassDetails;
