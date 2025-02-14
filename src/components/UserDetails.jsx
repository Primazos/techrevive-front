import React from "react";
import { CATEGORIES } from "./ui/CategoryList/CategoryList"; // Asegúrate de que la ruta sea correcta

const UserDetails = ({ user }) => {
  return (
    <div className="flex bg-base-300 p-6 rounded-lg w-full max-w-4xl mx-auto">
      {/* Panel Izquierdo - Foto y Detalles */}
      <div className="w-1/3 bg-primary p-4 rounded-lg flex flex-col items-center">
        {/* Foto */}
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        {/* Detalles del Usuario */}
        <div className="bg-base-primary p-4 rounded-lg w-full text-center">
          <p className="font-bold text-primary-content">{user.name}</p>
          <p className="text-secondary-content">{user.surname}</p>
          <p className="text-secondary-content">{user.email}</p>
        </div>
      </div>

      {/* Panel Derecho - Categorías */}
      <div className="w-2/3 bg-secondary p-4 rounded-lg ml-4">
        <h2 className="text-lg font-bold mb-2 text-secondary-content">Tus Productos</h2>
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((category) => (
            <div key={category.ddbb_name} className="bg-base-100 p-4 rounded-lg shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-20 h-20 object-cover rounded mb-2"
              />
              <p className="font-semibold text-white">{category.name}</p>
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
