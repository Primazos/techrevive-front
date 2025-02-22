import React, { useState } from "react";
import axios from "axios";
import API from "../../../db/conn";

const CreditCard = ({ creditCard, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API}/api/credit-cards/delete-credit-card/${creditCard._id}`
      );
      console.log("Tarjeta eliminada:", response.data);
      onDelete(creditCard._id); // Llamar a la función onDelete
      handleCloseModal(); // Cerrar el modal
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al eliminar la tarjeta.");
    }
  };

  return (
    <div>
      <div className="w-64 h-40 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg p-4 flex flex-col justify-between shadow-lg relative">
        <button
          className="absolute -top-2 -right-2 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs shadow-md"
          onClick={handleOpenModal}
        >
          ✕
        </button>
        <p className="text-lg">
          {creditCard.card_number || "**** **** **** ****"}
        </p>
        <div className="flex justify-between text-sm">
          <span>{creditCard.expiration_date || "MM/AA"}</span>
          <span>{creditCard.brand || "Marca"}</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="card bg-base-200 shadow-xl w-96">
            <div className="card-body">
              <h2 className="text-xl font-bold">
                ¿Estás seguro de que deseas eliminar esta tarjeta?
              </h2>
              <div className="card-actions justify-between mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-error"
                  onClick={handleDelete}
                >
                  Eliminar Tarjeta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditCard;
