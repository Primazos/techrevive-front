import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../db/conn";
import useAuthStore from "../../store/authStore";

const TransactionDetailsModal = ({ transaction, onClose }) => {
  const { userId } = useAuthStore();
  const [buyerUser, setBuyerUser] = useState(null);
  const [sellerUser, setSellerUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [buyerRes, sellerRes] = await Promise.all([
          axios.get(`${API}/api/users/get-user/${transaction.buyer_id}`),
          axios.get(`${API}/api/users/get-user/${transaction.seller_id}`),
        ]);
        setBuyerUser(buyerRes.data);
        setSellerUser(sellerRes.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, [transaction.buyer_id, transaction.seller_id]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-base-200 rounded-lg shadow-xl max-w-4xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img
              src={transaction.image_url}
              alt={transaction.product_name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">
              {transaction.product_name}
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Categoría:</span>{" "}
              {transaction.category}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Precio:</span>{" "}
              {transaction.sale_price} €
            </p>
            {sellerUser && (
              <p className="mb-2">
                <span className="font-semibold">Vendedor:</span>{" "}
                {sellerUser.username}
              </p>
            )}
            {buyerUser && (
              <p className="mb-2">
                <span className="font-semibold">Comprador:</span>{" "}
                {buyerUser.username}
              </p>
            )}
            {transaction.address && (
              <div className="mb-2">
                <p className="font-semibold">Dirección:</p>
                <p>
                  {transaction.address.address}, {transaction.address.city},{" "}
                  {transaction.address.region}, {transaction.address.country} -{" "}
                  {transaction.address.postal_code}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
