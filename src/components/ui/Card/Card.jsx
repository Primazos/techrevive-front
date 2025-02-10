import React from "react";

const Card = ({ item }) => {
  return (
    <div className="card bg-base-100 w-60 h-auto shadow-xl flex flex-col">
      <figure className="h-56 w-full">
        <img 
          src={item.image_urls[0]} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title self-center">{item.title}</h2>
      </div>
    </div>
  );
};

export default Card;
