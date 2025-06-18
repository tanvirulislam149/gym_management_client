import React from "react";
import Button from "../Button/Button";
import gym from "../../images/gym.jpg";
import Image from "next/image";
import Link from "next/link";

const Fitness_classes = async () => {
  let classes = [];
  try {
    const data = await fetch(
      "https://gym-management-0fmi.onrender.com/fitness_classes/"
    );
    classes = await data.json();
  } catch (error) {
    console.log(error);
  }
  return (
    <div id="classes" className="max-w-[1200px] mx-auto my-20">
      <p className="text-primary font-bold text-3xl lg:text-5xl ml-10 mb-10">
        -Fitness Classes
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
        {classes?.map((c) => (
          <div
            key={c.id}
            className="card mx-5 lg:mx-0 shadow-sm h-100 bg-base-200"
          >
            <figure className="">
              <Image
                className="h-40"
                src={c.image}
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{c.name}</h2>
              <p>{c.description.slice(0, 100)}...</p>
              <div className="card-actions justify-end">
                <Button>
                  <Link href={`/classes/${c.id}`}>Join now</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fitness_classes;
