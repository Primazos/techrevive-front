import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../../../db/conn";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const PurchaseConfirmationModal = ({ product, onClose }) => {
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCardAndAddress = async () => {
      try {
        // Obtener detalles de la tarjeta
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

        // Obtener detalles de la dirección del usuario
        const userResponse = await axios.get(
          `${API}/api/users/get-user/${userId}`
        );
        setAddressData({
          city: userResponse.data.location?.city || "Las Palmas", // Valor por defecto si no está disponible
          region: userResponse.data.location?.region || "Canarias", // Valor por defecto si no está disponible
          country: userResponse.data.location?.country || "España", // Valor por defecto si no está disponible
          address: "", // Se rellenará manualmente
          postalCode: "", // Se rellenará manualmente
        });
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchCardAndAddress();
  }, [userId]);

  const handleConfirmPurchase = async () => {
    setIsLoading(true);
    setError("");

    const transactionData = {
      buyer_id: userId,
      seller_id: product.user_id,
      product_id: product._id,
      card_id: card._id,
      product_name: product.title,
      category: product.category,
      sale_price: product.price,
      image_url: product.image_urls[0],
      address: addressData,
    };

    try {
      // Crear la transacción
      const response = await axios.post(
        `${API}/api/transactions/add-transaction/`,
        transactionData
      );
      console.log("Transacción creada:", response.data);

      // Actualizar el estado del producto a 'sold: true'
      await axios.patch(
        `${API}/api/products/mark-product-as-sold/${product._id}`
      );
      console.log("Producto marcado como vendido");

      // Mostrar mensaje de confirmación
      setShowConfirmation(true);
    } catch (error) {
      setError("Hubo un error al procesar la compra. Intenta nuevamente.");
      console.error("Error al crear la transacción:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    onClose();
    navigate("/");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="modal-box bg-base-200 max-w-6xl">
          {/* Mostrar solo si la transacción NO ha sido confirmada */}
          {!showConfirmation && (
          <h2 className="text-2xl font-bold mb-6 text-primary">
            Producto seleccionado
          </h2>
          )}

          {/* Si la transacción fue confirmada, mostrar el mensaje de éxito */}
          {showConfirmation ? (
            <div className="text-center">
              <p className="text-xl font-semibold text-green-600">
                ¡Gracias por tu compra! El producto ha sido adquirido.
              </p>
              <button onClick={handleSuccess} className="btn btn-primary mt-4">
                Cerrar
              </button>
            </div>
          ) : (
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
                      required
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
                      required
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
          )}

          {/* Pie del modal */}
          {!showConfirmation && (
            <div className="modal-action mt-6">
              <button onClick={onClose} className="btn btn-ghost">
                Cancelar
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirmPurchase}
                disabled={
                  isLoading ||
                  !card ||
                  !addressData.address.trim() ||
                  !addressData.postalCode.trim()
                }
              >
                {isLoading ? "Procesando..." : "Confirmar Compra"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PurchaseConfirmationModal;
