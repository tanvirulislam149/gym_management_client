import React from "react";
import plan_bg from "../../images/plan_bg.jpg";
import Image from "next/image";
import Button from "../Button/Button";

const Plans = async () => {
  const data = await fetch("http://127.0.0.1:8000/plans/");
  const plans = await data.json();
  return (
    <div className="max-w-[1200px] mx-auto mb-10">
      <p className="text-primary font-bold text-5xl mb-10">-Membership Plans</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 place-items-center">
        {plans?.map((p) => (
          <div
            key={p.id}
            className="card bg-base-100 image-full w-65 my-4 hover:border border-green-400 rounded-none shadow-sm"
          >
            <p>{p.type}</p>
            <figure>
              <Image
                className="w-full"
                src={plan_bg}
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </figure>
            <div className="card-body">
              <h2 className="text-4xl font-bold text-green-400">
                {p.price} BDT
              </h2>
              <h2 className="text-xl font-bold leading-none mt-4">{p.type}</h2>
              <h2 className="text-xl font-bold leading-none mb-4">
                Membership
              </h2>
              <ul>
                {p?.fitness_classes?.map((c) => (
                  <li key={c.id} className="text-lg py-2">
                    {c.name}
                    <hr />
                  </li>
                ))}
              </ul>
              <div className="card-actions justify-end">
                <Button>Buy now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
