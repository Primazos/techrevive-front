import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import API from "../../../db/conn";
import Card from "../../ui/Card/Card";

const DataDetails = ({ data }) => {
  const { userId } = useAuthStore();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Obtener datos del usuario
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API}/api/users/get-user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Obtener productos del usuario
  const getProductsByUserId = async () => {
    try {
      const response = await axios.get(
        `${API}/api/products/get-products-by-user/${userId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Lógica para determinar qué datos cargar
  useEffect(() => {
    setLoading(true);
    setError(null);

    if (data === "Mi perfil") {
      fetchUser();
    } else if (data === "Mis productos") {
      getProductsByUserId();
    } else {
      setLoading(false); // Si no es un caso de carga de datos, termina el loading
    }
  }, [data, userId]);

  // 🔹 Mostrar carga o error si existen
  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex justify-center">
      {data == "Mi perfil" ? (
        <div className="card bg-neutral h-auto w-[60%]">
          <div className="flex w-full justify-center">
            <div className="badge badge-neutral mt-6 text-2xl">Mis datos</div>
          </div>
          <div className="flex flex-row justify-around py-6">
            <div className="mb-4 flex flex-col gap-4">
              <h4 className="text-lg">Datos personales:</h4>
              <p>
                <strong>Nombre:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Género:</strong> {user.gender}
              </p>
              <p>
                <strong>Teléfono:</strong> {user.phone || "No disponible"}
              </p>
            </div>
            <div className="mb-4 flex flex-col gap-4">
              <h4 className="text-lg">Ubicación:</h4>
              <p>
                <strong>Ciudad:</strong>{" "}
                {user.location?.city || "No disponible"}
              </p>
              <p>
                <strong>Región:</strong>{" "}
                {user.location?.region || "No disponible"}
              </p>
              <p>
                <strong>País:</strong>{" "}
                {user.location?.country || "No disponible"}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {data == "Mis productos" ? (
        <div className="card bg-neutral h-auto w-[80%]">
          <div className="flex w-full justify-center">
            <div className="badge badge-neutral mt-6 text-2xl">
              Mis productos
            </div>
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
