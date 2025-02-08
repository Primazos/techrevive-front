import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../db/conn";
import Card from "../../ui/Card/Card";

const DataDetails = ({ data }) => {
  const userId = "d79829b7-fe37-4561-b7e8-dcbe811dd853";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductsByUserId = async () => {
    try {
      const response = await axios.get(
        `${API}/api/products/get-products-by-user/${userId}`
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data === "Mis productos") {
      getProductsByUserId();
    }
  }, [data]);

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex justify-center">
      {data == "Mi perfil" ? (
        <div className="card bg-neutral h-auto w-[80%] pb-6">
        <div className="flex w-full justify-center">
          <div className="badge badge-neutral mt-6 text-2xl">Mis datos</div>
        </div>
      </div>
      ) : null}
      {data == "Mis productos" ? (
        <div className="card bg-neutral h-auto w-[80%]">
          <div className="flex w-full justify-center">
            <div className="badge badge-neutral mt-6 text-2xl">Mis productos</div>
          </div>
          {/* <div className="grid grid-auto-flow-row-dense grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 p-6 rounded-box w-full self-center place-items-center"> */}
          <div className="flex flex-row flex-wrap p-6 gap-16 justify-center">
            {products.map((product, index) => {
              return <Card item={product} key={index} />;
            })}
          </div>
        </div>
      ) : null}
      {data == "Mis favoritos" ? (
        <div className="card bg-neutral rounded-box w-[80%] self-center grid h-52 place-items-center">
          Mis favoritos
        </div>
      ) : null}
      {data == "Transacciones" ? (
        <div className="card bg-neutral rounded-box w-[80%] self-center grid h-52 place-items-center">
          Transacciones
        </div>
      ) : null}
      {data == "Tarjetas" ? (
        <div className="card bg-neutral rounded-box w-[80%] self-center grid h-52 place-items-center">
          Tarjetas
        </div>
      ) : null}
    </div>
  );
};

export default DataDetails;
