import { useState } from "react";

const CreditCardModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
    brand: "",
  });

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 rounded-lg shadow-lg w-3/4 max-w-3xl p-6 flex">
        {/* Formulario */}
        <div className="w-1/2 p-4 border-r border-base-300">
          <h2 className="text-xl font-semibold mb-4 text-primary">Añadir Tarjeta</h2>
          <form className="space-y-4">
            <input
              type="text"
              name="cardNumber"
              placeholder="Número de Tarjeta"
              className="w-full p-2 border rounded bg-base-100 text-base-content"
              value={cardData.cardNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              name="expiration"
              placeholder="Expiración (MM/AA)"
              className="w-full p-2 border rounded bg-base-100 text-base-content"
              value={cardData.expiration}
              onChange={handleChange}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              className="w-full p-2 border rounded bg-base-100 text-base-content"
              value={cardData.cvv}
              onChange={handleChange}
            />
            <input
              type="text"
              name="brand"
              placeholder="Marca (Visa, MasterCard)"
              className="w-full p-2 border rounded bg-base-100 text-base-content"
              value={cardData.brand}
              onChange={handleChange}
            />
          </form>
          <button
            className="mt-4 w-full bg-primary text-primary-content p-2 rounded hover:bg-primary-focus"
            onClick={() => alert("Tarjeta guardada")}
          >
            Guardar Tarjeta
          </button>
        </div>

        {/* Vista previa de la tarjeta */}
        <div className="w-1/2 p-4 flex flex-col items-center justify-between">
          <h2 className="text-xl font-semibold mb-4 text-primary">Vista Previa</h2>
          <div className="w-64 h-40 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg p-4 flex flex-col justify-between shadow-lg">
            <p className="text-lg">{cardData.cardNumber || "**** **** **** ****"}</p>
            <div className="flex justify-between text-sm">
              <span>{cardData.expiration || "MM/AA"}</span>
              <span>{cardData.brand || "Marca"}</span>
            </div>
          </div>
          {/* Botón "Salir" centrado y abajo */}
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost mt-4"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCardModal;