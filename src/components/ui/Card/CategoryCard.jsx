import React from "react";

const CategoryCard = ({ item }) => {
  return (
    <div className="card bg-neutral w-60 h-auto shadow-xl flex flex-col">
      <figure className="h-56 w-full">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="card-title self-center">{item.name}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
