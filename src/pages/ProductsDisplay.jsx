import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/ui/Card/Card";
import API from "../db/conn";
import { useParams } from "react-router-dom";

const ProductsDisplay = () => {
  const category = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log(category);
    const fetchProducts = async () => {
      try {
        const formattedCategory = category.category.split("-").join(" ");
        const response = await axios.get(
          `${API}/api/products/get-products-by-category/${formattedCategory}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="flex flex-row flex-wrap p-6 gap-16 justify-center">
      {products.map((product, index) => {
        return <Card item={product} colorCard={"bg-neutral"} key={index} />;
      })}
    </div>
  );
};

export default ProductsDisplay;
