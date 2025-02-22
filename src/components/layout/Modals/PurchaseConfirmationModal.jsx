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
  const [addressData, setAddressData] = useState({
    city: "",
    region: "",
    country: "",
    address: "",
    postalCode: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchCardAndAddress = async () => {
      try {
        // Fetch credit card details
        const cardResponse = await axios.get(
          `${API}/api/credit-cards/get-default-credit-card/${userId}`
        );
        setCard(cardResponse.data);
        const last4Digits = cardResponse.data.card_number.slice(-4);
        setCardData({
          cardNumber: `****  ****  ****  ${last4Digits}`,
          expiration: cardResponse.data.expiration_date,
          brand: cardResponse.data.brand,
        });

        // Fetch user's address details from the "get-user" endpoint
        const userResponse = await axios.get(
          `${API}/api/users/get-user/${userId}`
        );
        setAddressData({
          city: userResponse.data.location?.city || "Las Palmas", // Default if not available
          region: userResponse.data.location?.region || "Canarias", // Default if not available
          country: userResponse.data.location?.country || "España", // Default if not available
          address: "", // Add user's address if needed
          postalCode: "", // Add postal code if needed
        });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchCardAndAddress();
  }, [userId]);

  const handleConfirmPurchase = () => {
    setShowConfirmation(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="modal-box bg-base-200 max-w-6xl">
          <h2 className="text-2xl font-bold mb-6 text-primary">
            Confirmar Transacción
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sección de Detalles del Producto y Dirección */}
            <div className="flex-1 border-secondary/20 md:border-r md:pr-4 space-y-6">
              <h3 className="text-lg font-semibold text-secondary">
                Detalles del Producto
              </h3>
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <p className="text-lg font-medium">{product.title}</p>
                  <p className="text-xl font-bold text-primary">
                    ${product.price}
                  </p>
                </div>
              </div>

              {/* Sección de Dirección */}
              <h3 className="text-lg font-semibold text-secondary">
                Dirección de Envío
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Ciudad:</strong> {addressData.city || "Las Palmas"}
                </p>
                <p>
                  <strong>Región:</strong> {addressData.region || "Canarias"}
                </p>
                <p>
                  <strong>País:</strong> {addressData.country || "España"}
                </p>
              </div>

              {/* Formulario de Dirección */}
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-2"
                  >
                    Dirección:
                  </label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Dirección"
                    className="input input-bordered w-full"
                    value={addressData.address}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium mb-2"
                  >
                    Código Postal:
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    placeholder="Código Postal"
                    className="input input-bordered w-full"
                    value={addressData.postalCode}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        postalCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Sección de la Tarjeta */}
            <div className="flex flex-col w-[30%] space-y-4 items-center">
              <h3 className="text-lg font-semibold text-secondary">
                Método de Pago
              </h3>

              {/* Vista previa de la tarjeta */}
              {card ? (
                <div className="space-y-4">
                  <div className="w-64 h-40 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg p-4 flex flex-col justify-between shadow-lg">
                    <p className="text-lg tracking-widest">
                      {cardData.cardNumber}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>{cardData.expiration}</span>
                      <span>{cardData.brand}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-base-300 rounded-lg">
                    <p className="font-medium">Tarjeta Activa</p>
                    <p className="text-sm opacity-70">
                      Esta tarjeta será utilizada para el pago
                    </p>
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
            <button
              className="btn btn-primary"
              onClick={handleConfirmPurchase}
              disabled={!card}
            >
              Confirmar Compra
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchaseConfirmationModal;
