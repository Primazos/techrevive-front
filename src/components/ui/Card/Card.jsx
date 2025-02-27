import React from "react";

const Card = ({ item, colorCard }) => {
  return (
    <div className={`card ${colorCard} w-60 h-80 shadow-xl flex flex-col`}>
      <figure className="h-56 w-full">
        <img
          src={item.image_urls[0]}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body text-center flex-grow flex items-center justify-center">
        <h2 className="card-title w-full h-16 text-ellipsis overflow-hidden line-clamp-2">
          {item.title}
        </h2>
      </div>
    </div>
  );
};

export default Card;
