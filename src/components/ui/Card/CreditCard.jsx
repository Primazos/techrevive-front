import React, { useState } from "react";
import axios from "axios";
import API from "../../../db/conn";

const CreditCard = ({ creditCard, onDelete, onSelectDefault }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDefault, setIsDefault] = useState(creditCard.is_default); // Establecemos el estado inicial

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectDefault = async () => {
    try {
      await axios.put(
        `${API}/api/credit-cards/select-default-credit-card/${creditCard._id}`
      );
      onSelectDefault(creditCard._id); // Actualizar el estado en DataDetails
      setIsDefault(true); // Cambiar el estado local
    } catch (error) {
      console.error("Error al seleccionar tarjeta predeterminada", error);
    }
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
      <div
        className={`w-64 h-40 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg p-4 flex flex-col justify-between shadow-lg relative ${
          isDefault ? "border-4 border-accent" : ""
        }`}
      >
        {!isDefault && (
          <button
            className="absolute -top-2 -right-2 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full text-xs shadow-md"
            onClick={handleOpenModal}
          >
            ✕
          </button>
        )}
        <p className="text-lg">
          {creditCard.card_number
            ? creditCard.card_number
                .replace(/\s+/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim()
            : "**** **** **** ****"}
        </p>
        <div className="flex justify-between text-sm">
          <span>{creditCard.expiration_date || "MM/AA"}</span>
          <span>{creditCard.brand || "Marca"}</span>
        </div>

        {!isDefault ? (
          <button onClick={handleSelectDefault} className="btn btn-accent ml-2">
            Marcar por defecto
          </button>
        ) : (
          <span className="ml-2 text-neutral">Predeterminada</span>
        )}
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
                <button className="btn btn-error" onClick={handleDelete}>
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
