"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

const Available_class = ({ id }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/scheduled_classes/?fitness_class_id=${id}`)
      .then((response) => response.json())
      .then((data) => setClasses(data));
  }, []);
  return (
    <div className="px-4 overflow-y-auto h-[500px]">
      <p className="text-center text-2xl font-bold my-3 border-b-2">
        Available Classes
      </p>
      {classes.length ? (
        classes.map((c) => (
          <div key={c.id} className="card bg-base-200 my-4 w-90">
            <div className="card-body">
              <h2 className="text-lg">
                <span className="font-bold">Time: </span>
                {new Date(c.date_time).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h2>
              <hr />
              <h2 className="text-lg">
                <span className="font-bold">Instructor: </span>
                {c.instructor}
              </h2>
              <hr />
              <h2 className="text-lg">
                <span className="font-bold">Total Seats: </span>
                {c.total_seats}
              </h2>
              <hr />
              <div className="card-actions justify-end">
                <Button>Join Now</Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="">
          <p className="text-center">No Class Available</p>
        </div>
      )}
    </div>
  );
};

export default Available_class;
