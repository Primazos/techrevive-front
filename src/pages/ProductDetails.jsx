import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../db/conn";
import useAuthStore from "../components/store/authStore";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useAuthStore();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chatExists, setChatExists] = useState(false);

  const createChatHandler = async () => {
    try {
      const response = await axios.post(`${API}/api/chats/add-chat`, {
        product_id: product._id,
        seller_id: product.user_id,
        buyer_id: userId,
      });
      console.log("Chat creada:", response.data);
      if (response.data) {
        navigate(`/chat/${response.data._id}`);
      }
    } catch (error) {
      console.error("Error al crear el chat:", error);
    }
  };

  /* useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API}/api/products/get-product/${id}` // Usa id directamente
        );
        setProduct(response.data);
        console.log("Producto obtenido:", response.data.sold);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    console.log("ID del producto recibido:", id);
    if (id) {
      fetchProduct();
    }
  }, [id]); */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API}/api/products/get-product/${id}` // Usa id directamente
        );
        setProduct(response.data);
        console.log("Producto obtenido:", response.data.sold);

        // Verificar si ya existe un chat con el vendedor
        const chatResponse = await axios.get(
          `${API}/api/chats/get-chats-by-product/${id}`
        );

        // Verificar si alguno de los chats existentes tiene el mismo seller_id y buyer_id
        const chatExists = chatResponse.data.some(
          (chat) =>
            (chat.seller_id === response.data.user_id &&
              chat.buyer_id === userId) ||
            (chat.seller_id === userId &&
              chat.buyer_id === response.data.user_id)
        );

        setChatExists(chatExists); // Actualizar estado con la existencia del chat
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    console.log("ID del producto recibido:", id);
    if (id) {
      fetchProduct();
    }
  }, [id, userId]);

  const handlePrev = () => {
    setCurrentIndex(
      currentIndex === 0 ? product.image_urls.length - 1 : currentIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      currentIndex === product.image_urls.length - 1 ? 0 : currentIndex + 1
    );
  };

  if (loading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="flex flex-row w-full h-full justify-center gap-8 p-8">
      <div className="w-[40%] max-w-[500px] flex justify-center">
        <div className="carousel w-full rounded-lg h-full">
          {product.image_urls && product.image_urls.length > 0 ? (
            <div className="carousel-item relative w-full h-full">
              <img
                src={product.image_urls[currentIndex]}
                className="w-full h-full object-cover rounded-lg"
                alt={`Imagen ${currentIndex + 1}`}
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button onClick={handlePrev} className="btn btn-circle">
                  ❮
                </button>
                <button onClick={handleNext} className="btn btn-circle">
                  ❯
                </button>
              </div>
            </div>
          ) : (
            <p>No hay imágenes disponibles para este producto.</p>
          )}
        </div>
      </div>

      <div className="w-[60%] max-w-[600px] flex flex-col justify-start p-6 rounded-lg shadow-lg h-full">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-lg mb-4">
          <strong>Descripción:</strong>
          <br /> {product.description}
        </p>
        <p className="text-lg mb-6">
          <strong>Precio:</strong> ${product.price}
        </p>

        {/* Verifica si el producto está vendido */}
        {product.sold && isAuthenticated ? (
          <p className="text-red-500 font-semibold">
            Este producto ya está vendido
          </p>
        ) : (
          // Solo muestra botones si el usuario está autenticado
          isAuthenticated &&
          userId !== product.user_id && (
            <div className="flex flex-row gap-4 justify-start">
              <button className="btn btn-primary">Comprar</button>
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={createChatHandler}
                  disabled={chatExists} // Deshabilita el botón si el chat ya existe
                >
                  {chatExists
                    ? "Ya tienes un chat con el vendedor"
                    : "Chatear con el vendedor"}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
