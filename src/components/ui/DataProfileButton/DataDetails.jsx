import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import API from "../../../db/conn";
import Card from "../../ui/Card/Card";
import { IoAddOutline } from "react-icons/io5";
import AddProductModal from "../../AddProductModal"
import CreditCardModal from "../../CreditCardModal"; // Importa el modal de tarjetas

const DataDetails = ({ data }) => {
  const { userId } = useAuthStore();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para controlar la visibilidad de los modales
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      if (!user) {
        await fetchUser();
      }
      if (data === "Mis productos" && user) {
        await getProductsByUserId();
      }

      if (data === "Mis favoritos" && user) {
        await getProductsByUserId();
      }
      setLoading(false);
    };

    fetchData();
  }, [data, user]);

  if (!user)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (error) return <div className="flex justify-center">Error: {error}</div>;

  return (
    <div className="w-full flex justify-center">
      {data == "Mi perfil" ? (
        <div className="card bg-neutral h-auto w-[40%]">
          <div className="flex w-full justify-center">
            <div className="mt-6 text-2xl">Mis datos</div>
          </div>
          <div className="flex flex-row justify-around py-6">
            <div className="mb-4 flex flex-col gap-4">
              <h4 className="text-2xl">Datos personales:</h4>
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
              <h4 className="text-2xl">Ubicación:</h4>
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
          <div className="flex w-full justify-center relative">
            <div className="pt-6 text-2xl">Mis productos</div>
            {/* Botón para abrir el modal de productos */}
            <button
              className="btn btn-circle absolute bg-primary right-1 top-1"
              onClick={() => setIsAddProductModalOpen(true)}
            >
              <IoAddOutline size={30} />
            </button>
          </div>
          <div className="flex flex-row flex-wrap p-6 gap-16 justify-center">
            {products.length > 0 ? (
              products.map((product, index) => {
                return (
                  <Card item={product} colorCard={"bg-base-100"} key={index} />
                );
              })
            ) : (
              <div className="flex flex-col gap-4 text-center">
                <h4 className="text-2xl">No tienes productos.</h4>
                <p className="text-sm">
                  Puedes agregar productos a tu perfil desde el botón de
                  "Agregar producto" en la página de inicio.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {data == "Mis favoritos" ? (
        <div className="card bg-neutral h-auto w-[80%]">
          <div className="flex w-full justify-center relative">
            <div className="pt-6 text-2xl">Mis favoritos</div>
          </div>
          <div className="flex flex-row flex-wrap p-6 gap-16 justify-center">
            {favorites.length > 0 ? (
              favorites.map((favorite, index) => {
                return <Card item={favorite} key={index} />;
              })
            ) : (
              <div className="flex flex-col gap-4 text-center">
                <h4 className="text-2xl">No tienes favoritos</h4>
                <p className="text-sm">
                  Puedes agregar productos a tu lista de favoritos haciendo clic
                  en el icono del corazón en los productos.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {data == "Transacciones" ? (
        <div className="card bg-neutral h-auto w-[80%]">
          <div className="flex w-full justify-center relative">
            <div className="pt-6 text-2xl">Transacciones</div>
          </div>
          <div className="flex flex-row flex-wrap p-6 gap-16 justify-center">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => {
                return <Card item={transaction} key={index} />;
              })
            ) : (
              <div className="flex flex-col gap-4 text-center">
                <h4 className="text-2xl">
                  No has realizado ninguna transacción
                </h4>
                <p className="text-sm">
                  Para mostrar tus transacciones, debes haber realizado una
                  compra o venta de un producto.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {data == "Tarjetas" ? (
        <div className="card bg-neutral h-auto w-[80%]">
          <div className="flex w-full justify-center relative">
            <div className="pt-6 text-2xl">Mis tarjetas</div>
            {/* Botón para abrir el modal de tarjetas */}
            <button
              className="btn btn-circle absolute bg-primary right-1 top-1"
              onClick={() => setIsCreditCardModalOpen(true)}
            >
              <IoAddOutline size={30} />
            </button>
          </div>
          <div className="flex flex-row flex-wrap p-6 gap-16 justify-center">
            {creditCards.length > 0 ? (
              creditCards.map((creditCard, index) => {
                return <Card item={creditCard} key={index} />;
              })
            ) : (
              <div className="flex flex-col gap-4 text-center">
                <h4 className="text-2xl">No tienes tarjetas</h4>
                <p className="text-sm">
                  Puedes agregar tarjetas haciendo clic en el botón de arriba.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* Renderizar el modal de productos */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        userId={userId}
      />

      {/* Renderizar el modal de tarjetas */}
      <CreditCardModal
        isOpen={isCreditCardModalOpen}
        onClose={() => setIsCreditCardModalOpen(false)}
      />
    </div>
  );
};

export default DataDetails;