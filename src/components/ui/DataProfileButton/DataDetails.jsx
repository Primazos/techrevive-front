import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import API from "../../../db/conn";
import Card from "../../ui/Card/Card";
import { IoAddOutline } from "react-icons/io5";
import { Link } from "react-router";
import AddProduct from "../../layout/Modals/AddProduct";
import AddCreditCard from "../../layout/Modals/AddCreditCard";
import CreditCard from "../Card/CreditCard";
import TransactionCard from "../Card/TransactionCard";

const DataDetails = ({ data }) => {
  const { userId } = useAuthStore();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para controlar la visibilidad de los modales
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);
  const [isShowTransactionsModalOpen, setIsShowTransactionsModalOpen] =
    useState(false);

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

  const getCreditCardsByUserId = async () => {
    try {
      const response = await axios.get(
        `${API}/api/credit-cards/get-credit-cards/${userId}`
      );
      setCreditCards(response.data);
    } catch (error) {
      console.error("Error al obtener tarjetas:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDefault = async () => {
    try {
      setCreditCards([]);
      await getCreditCardsByUserId();

      setMessage({
        text: "Tarjeta predeterminada actualizada",
        type: "success",
      });
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 2000);
    } catch (error) {
      console.error("Error al seleccionar la tarjeta predeterminada", error);
      setMessage({ text: "Error al actualizar la tarjeta", type: "error" });
    }
  };

  const handleDeleteCreditCard = async (id) => {
    /* setCreditCards(creditCards.filter((card) => card._id !== id)); */
    setCreditCards([]);
    await getCreditCardsByUserId();

    setMessage({ text: "Tarjeta eliminada correctamente", type: "success" });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 2000);
  };

  const getTransactionsByUserId = async () => {
    try {
      const response = await axios.get(
        `${API}/api/transactions/get-transactions-by-user/${userId}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error al obtener las transacciones:", error);
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
      if (data === "Tarjetas" && user) {
        await getCreditCardsByUserId();
      }
      if (data === "Transacciones" && user) {
        await getTransactionsByUserId();
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
                  <div
                    key={index}
                    className="transition-transform transform hover:scale-105 hover:cursor-pointer"
                  >
                    <Link to={`/product/${product._id}`}>
                      <Card item={product} colorCard={"bg-base-100"} />
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col gap-4 text-center">
                <h4 className="text-2xl">No tienes productos.</h4>
                <p className="text-sm">
                  Puedes agregar productos pulsando el botón de la derecha.
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
                return <TransactionCard transaction={transaction} key={index} />;
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
                return (
                  <CreditCard
                    creditCard={creditCard}
                    onDelete={handleDeleteCreditCard}
                    onSelectDefault={handleSelectDefault} // Llamamos a la función para actualizar el estado
                    key={index}
                  />
                );
              })
            ) : (
              <div className="flex flex-col gap-4 text-center">
                <h4 className="text-2xl">No tienes tarjetas</h4>
                <p className="text-sm">
                  Puedes agregar tus tarjetas pulsando el botón de la derecha.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* Renderizar el modal de productos */}
      <AddProduct
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        userId={userId}
      />

      <AddCreditCard
        isOpen={isCreditCardModalOpen}
        onClose={() => setIsCreditCardModalOpen(false)}
        userId={userId}
      />

      <showTransactions
        isOpen={isShowTransactionsModalOpen}
        onClose={() => setIsShowTransactionsModalOpen(false)}
        userId={userId}
      />

      {message.text && (
        <div
          className={`alert ${
            message.type === "error" ? "alert-error" : "alert-success"
          } w-auto absolute left-1/2 top-20 z-50 transform -translate-x-1/2 p-3 rounded-lg`}
        >
          <span>{message.text}</span>
        </div>
      )}
    </div>
  );
};

export default DataDetails;
