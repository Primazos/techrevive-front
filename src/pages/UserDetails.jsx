import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../db/conn";
import axios from "axios";
import ProductUserProfileCard from "../components/ui/Card/ProductUserProfileCard";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API}/api/users/get-user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    const getProductsByUserId = async () => {
      try {
        const response = await axios.get(
          `${API}/api/products/get-products-by-user/${id}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    if (id) {
      fetchUser();
      getProductsByUserId();
    }
  }, [id]);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex bg-base-300 p-6 rounded-lg w-full h-full">
      <div className="w-1/3 p-4 pt-16 rounded-lg flex flex-col gap-10 items-center">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
            <img src={user.avatar_img} alt={user.username} />
          </div>
        </div>

        <div className="w-full h-full flex flex-col justify-between">
          <div className="bg-base-primary px-4 rounded-lg w-full flex flex-col items-center text-center">
            <div className="flex flex-col justify-center items-center">
              <p className="badge badge-secondary font-bold p-4 text-2xl">
                Usuario
              </p>
              <p className="font-bold p-4 text-2xl">{user.username}</p>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col justify-center items-center">
              <p className="badge badge-secondary font-bold p-4 text-2xl">
                Nombre
              </p>
              <p className="font-bold p-4 text-2xl">{user.name}</p>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col justify-center items-center">
              <p className="badge badge-secondary font-bold p-4 text-2xl">
                Correo
              </p>
              <p className="font-bold p-4 text-2xl">{user.email}</p>
            </div>
            <div className="divider"></div>
          </div>

          <div className="bg-base-secondary p-4 mb-16 rounded-lg w-full flex flex-col gap-5 items-center text-center">
            <p className="badge badge-secondary font-bold p-4 text-2xl">
              Total de productos: {products.length}
            </p>
          </div>
        </div>
      </div>

      <div className="w-2/3 p-4 rounded-lg ml-4 flex flex-col h-full">
        <h2 className="font-bold p-4 text-2xl justify-center flex">
          Tus Productos
        </h2>

        <div className="w-full flex flex-col gap-6 flex-grow">
          {currentProducts.map((product) => (
            <ProductUserProfileCard product={product} key={product._id} />
          ))}
        </div>

        <div className="join mt-4 flex justify-center">
          <button
            className="join-item btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn">
            Página {currentPage} de {totalPages}
          </button>
          <button
            className="join-item btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
