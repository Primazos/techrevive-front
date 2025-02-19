import { useState } from "react";

const CreditCardModal = ({ isOpen, onClose, userId }) => {
  if (!isOpen) return null;

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
    brand: "",
  });

  const detectCardBrand = (number) => {
    const patterns = {
      Visa: /^4/,
      MasterCard: /^5[1-5]/,
      Amex: /^3[47]/,
      Discover: /^6/,
    };

    for (let brand in patterns) {
      if (patterns[brand].test(number)) {
        return brand;
      }
    }
    return "";
  };

  const formatExpiration = (value) => {
    return value
      .replace(/\D/g, "") // Elimina caracteres no numéricos
      .replace(/(\d{2})(\d{0,2})/, "$1/$2") // Formato MM/AA
      .substring(0, 5); // Máximo 5 caracteres
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").substring(0, 16);
      const brand = detectCardBrand(value);
      setCardData((prev) => ({ ...prev, brand, cardNumber: value }));
      return;
    }

    if (name === "expiration") {
      value = formatExpiration(value);
    }

    if (name === "cvv") {
      value = value.replace(/\D/g, "").substring(0, cardData.brand === "Amex" ? 4 : 3);
    }

    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 rounded-lg shadow-lg w-3/4 max-w-3xl p-6 flex">
        {/* Formulario */}
        <div className="w-1/2 p-4 border-r border-base-300">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Añadir Tarjeta
          </h2>
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
              placeholder="Marca (Detectada Automáticamente)"
              className="w-full p-2 border rounded bg-base-100 text-base-content"
              value={cardData.brand}
              readOnly
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
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Vista Previa
          </h2>
          <div className="w-64 h-40 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg p-4 flex flex-col justify-between shadow-lg">
            <p className="text-lg tracking-widest">
              {cardData.cardNumber.replace(/(\d{4})/g, "$1 ").trim() || "**** **** **** ****"}
            </p>
            <div className="flex justify-between text-sm">
              <span>{cardData.expiration || "MM/AA"}</span>
              <span>{cardData.brand || "Marca"}</span>
            </div>
          </div>
          {/* Botón "Salir" */}
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
