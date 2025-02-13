import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/ui/Card/Card";
import API from "../db/conn";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductsDisplay = () => {
  const category = useParams();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");

  const getTitle = (category) => {
    if (category === "placa-base") {
      setTitle("Placas base");
    } else if (category === "cpu") {
      setTitle("CPU");
    } else if (category === "disco-duro") {
      setTitle("Discos duros");
    } else if (category === "tarjeta-grafica") {
      setTitle("Tarjetas gráficas");
    } else if (category === "memoria-ram") {
      setTitle("Memorias RAM");
    } else {
      setTitle("Fuentes de alimentación");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const formattedCategory = category.category.split("-").join(" ");
        const response = await axios.get(
          `${API}/api/products/get-products-by-category/${formattedCategory}`
        );
        setProducts(response.data);

        getTitle(category.category);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="flex py-8 flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex flex-row flex-wrap p-6 gap-16 justify-center">
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className="shadow-xl transition-transform transform hover:scale-105 hover:cursor-pointer"
            >
              <Link to={`/product/${product._id}`}>
                <Card item={product} colorCard={"bg-neutral"} key={index} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsDisplay;
