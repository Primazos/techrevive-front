import { useCartStore } from "../store/cartStore";

const ProductCard = ({ product, userId }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border p-4">
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <button onClick={() => addToCart(userId, product)} className="bg-blue-500 text-white p-2 rounded">
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
