import React from "react";
import Button from "../Button/Button";
import gym from "../../images/gym.jpg";
import Image from "next/image";
import Link from "next/link";

const Fitness_classes = async () => {
  const data = await fetch("http://127.0.0.1:8000/fitness_classes/");
  const classes = await data.json();
  return (
    <div className="max-w-[1200px] mx-auto my-20">
      <p className="text-primary font-bold text-5xl mb-10">-Fitness Classes</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
        {classes?.map((c) => (
          <div key={c.id} className="card w-66 shadow-sm bg-base-200">
            <figure>
              <Image
                className="w-full"
                src={gym}
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{c.name}</h2>
              <p>{c.description}</p>
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
