import React from "react";
import { Link } from "react-router";

const ProductUserProfileCard = ({product}) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src={product.image_urls[0]}
          alt={product.title}
          className="w-40 h-40 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <div className="card-actions justify-end">
          <Link to={`/product/${product._id}`}>
          <button className="btn btn-primary">Ver producto</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductUserProfileCard;
