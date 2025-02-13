import React from "react";
import { CATEGORIES } from "./ui/CategoryList/CategoryList"; // Asegúrate de que la ruta sea correcta

const UserDetails = ({ user }) => {
  return (
    <div className="flex bg-blue-300 p-6 rounded-lg w-full max-w-4xl mx-auto">
      {/* Panel Izquierdo - Foto y Detalles */}
      <div className="w-1/3 bg-yellow-300 p-4 rounded-lg flex flex-col items-center">
        {/* Foto */}
        <div className="w-24 h-24 bg-white rounded-full mb-4"></div>

        {/* Detalles del Usuario */}
        <div className="bg-white p-4 rounded-lg w-full text-center">
          <p className="font-bold">{user.name}</p>
          <p>{user.surname}</p>
          <p>{user.email}</p>
        </div>
      </div>

      {/* Panel Derecho - Categorías */}
      <div className="w-2/3 bg-yellow-300 p-4 rounded-lg ml-4">
        <h2 className="text-lg font-bold mb-2">Categorías de Productos</h2>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((category) => (
            <div key={category.ddbb_name} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-20 h-20 object-cover rounded mb-2"
              />
              <p className="font-semibold">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Ejemplo de uso
const exampleUser = {
  name: "Juan",
  surname: "Pérez",
  email: "juan.perez@example.com",
  products: [
    { name: "Laptop", price: "500" },
    { name: "Teléfono", price: "200" },
    { name: "Tablet", price: "300" },
    { name: "Auriculares", price: "50" },
  ],
};

export default function App() {
  return <UserDetails user={exampleUser} />;
}
