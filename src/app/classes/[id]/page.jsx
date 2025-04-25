import React from "react";

const ClassDetails = async ({ params }) => {
  const { id } = await params;
  const data = await fetch(`http://127.0.0.1:8000/fitness_classes/${id}`);
  const fitness_class = await data.json();
  console.log(fitness_class);
  return (
    <div>
      <h1>{id}</h1>
      <p>{fitness_class.name}</p>
    </div>
  );
};

export default ClassDetails;
