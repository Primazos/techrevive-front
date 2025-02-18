import { useCartStore } from "../store/cartStore";
import { useEffect } from "react";

const Cart = ({ userId }) => {
  const { cart, fetchCart, removeFromCart } = useCartStore();

  useEffect(() => {
    fetchCart(userId);
  }, [userId]);

  // Simulación de compra
  const checkout = () => {
    alert("Compra realizada con éxito. Gracias por confiar en TechRevive.");
    useCartStore.setState({ cart: [] }); // Limpiar el carrito
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        cart.map((item) => (
          <div key={item.productId._id} className="border p-2 flex justify-between">
            <p>{item.productId.name} x {item.quantity}</p>
            <button onClick={() => removeFromCart(userId, item.productId._id)} className="text-red-500">
              Eliminar
            </button>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <button onClick={checkout} className="bg-green-500 text-white p-2 rounded mt-4">
          Finalizar compra
        </button>
      )}
    </div>
  );
};

export default Cart;
