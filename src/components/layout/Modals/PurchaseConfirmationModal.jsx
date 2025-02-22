import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../../db/conn";
import useAuthStore from "../../store/authStore";

const PurchaseConfirmationModal = ({ product, onClose }) => {
  const { userId } = useAuthStore();
  const [card, setCard] = useState(null);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiration: "",
    brand: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`${API}/api/credit-cards/get-default-credit-card/${userId}`);
        setCard(response.data);
        console.log("Tarjeta obtenida:", response.data);
        const last4Digits = response.data.card_number.slice(-4);
        setCardData({
          cardNumber: `****  ****  ****  ${last4Digits}`,
          expiration: response.data.expiration_date,
          brand: response.data.brand,
        });
      } catch (error) {
        console.error("Error al obtener la tarjeta activa:", error);
      }
    };

    fetchCard();
  }, [userId]);

  const handleConfirmPurchase = () => {
    setShowConfirmation(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="modal-box bg-base-200 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-primary">Confirmar Transacción</h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sección del producto */}
            <div className="flex-1 border-secondary/20 md:border-r md:pr-4">
              <h3 className="text-lg font-semibold text-secondary">Detalles del Producto</h3>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <p className="text-lg font-medium">{product.title}</p>
                  <p className="text-xl font-bold text-primary">${product.price}</p>
                </div>
              </div>
            </div>

            {/* Sección de tarjeta */}
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold text-secondary">Método de Pago</h3>

              {/* Vista previa de la tarjeta */}
              {card ? (
                <div className="space-y-4">
                  <div className="w-64 h-40 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg p-4 flex flex-col justify-between shadow-lg">
                    <p className="text-lg tracking-widest">{cardData.cardNumber}</p>
                    <div className="flex justify-between text-sm">
                      <span>{cardData.expiration}</span>
                      <span>{cardData.brand}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-base-300 rounded-lg">
                    <p className="font-medium">Tarjeta Activa</p>
                    <p className="text-sm opacity-70">Esta tarjeta será utilizada para el pago</p>
                  </div>
                </div>
              ) : (
                <div className="alert alert-error">
                  <span>No tienes una tarjeta activa registrada</span>
                </div>
              )}
            </div>
          </div>

          {/* Pie del modal */}
          <div className="modal-action mt-6">
            <button onClick={onClose} className="btn btn-ghost">
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleConfirmPurchase} disabled={!card}>
              Confirmar Compra
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseConfirmationModal;