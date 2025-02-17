import React, { useEffect, useState, useRef } from "react";
import useAuthStore from "../components/store/authStore";
import axios from "axios";
import API from "../db/conn";
import { useParams, useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const { userId, user } = useAuthStore(); // Obtiene el ID del usuario autenticado
  const { idChat } = useParams();
  const [chat, setChat] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [otherUserName, setOtherUserName] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  // Desplazar automáticamente hacia abajo cuando se agregue un mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Crear el nuevo mensaje
    const newMessage = {
      chat_id: idChat, // ID del chat (lo obtienes de useParams)
      sender_id: userId, // ID del usuario autenticado
      content: inputValue,
    };

    try {
      // Enviar el mensaje a la base de datos mediante una solicitud POST
      const response = await axios.post(
        `${API}/api/messages/add-message`,
        newMessage
      );
      const savedMessage = response.data;

      // Agregar el mensaje al estado local
      setMessages([...messages, savedMessage]);

      // Limpiar el campo de entrada
      setInputValue("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  // Función para eliminar el chat y los mensajes
  const deleteChatHandler = async () => {
    try {
      // Eliminar los mensajes del chat
      await axios.delete(`${API}/api/messages/delete-all-messages/${idChat}`);

      // Eliminar el chat
      const response = await axios.delete(
        `${API}/api/chats/delete-chat/${idChat}`
      );

      if (response.data) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error al eliminar el chat y los mensajes:", error);
    }
  };

  const fetchOtherUser = async (sellerId, buyerId) => {
    try {
      const otherUserId = userId === sellerId ? buyerId : sellerId;
      const response = await axios.get(
        `${API}/api/users/get-user/${otherUserId}`
      );
      setOtherUser(response.data);
    } catch (error) {
      console.error("Error al obtener el otro usuario:", error);
    }
  };

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.get(`${API}/api/chats/get-chat/${idChat}`);
        setChat(response.data);

        const otherUser =
          response.data.seller_id === userId
            ? response.data.buyer_username
            : response.data.seller_username;

        setOtherUserName(otherUser);
      } catch (error) {
        console.error("Error al obtener el chat:", error);
      } finally {
        setLoading(false); // Asegurar que loading pase a false
      }
    };

    if (idChat) fetchChat();
  }, [idChat, userId]);

  // Obtener los mensajes del chat al cargar el componente
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API}/api/messages/get-messages/${idChat}`
        );
        setMessages(response.data); // Actualizar el estado con los mensajes de la base de datos
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      }
    };

    if (idChat) {
      fetchMessages();
    }
  }, [idChat]);

  useEffect(() => {
    const fetchOtherUser = async () => {
      if (!chat) return;

      // Determinar quién es el otro usuario
      const otherUserId =
        userId === chat.seller_id ? chat.buyer_id : chat.seller_id;

      try {
        const response = await axios.get(
          `${API}/api/users/get-user/${otherUserId}`
        );
        setOtherUser(response.data);
      } catch (error) {
        console.error("Error al obtener el otro usuario:", error);
      }
    };

    if (chat && userId) {
      fetchOtherUser();
    }
  }, [chat, userId]);

  // Obtener el producto asociado al chat
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (chat) {
          const response = await axios.get(
            `${API}/api/products/get-product/${chat.product_id}`
          );
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    if (chat) {
      fetchProduct();
    }
  }, [chat]);

  if (loading)
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!product) {
    return <div>Producto no disponible...</div>;
  }

  return (
    <div className="flex bg-base-300 p-6 rounded-lg w-full h-screen">
      <div className="w-full h-[80%] self-center sm:w-1/3 p-4 rounded-lg ml-4 flex flex-col bg-neutral justify-between">
        <img
          src={product.image_urls[0]}
          alt={product.title}
          className="w-full h-[50%] object-cover rounded-md"
        />
        <h2 className="font-bold text-2xl text-center">{product.title}</h2>
        <div className="divider w-[80%] flex self-center"></div>
        <div className="text-lg px-4 max-h-40 overflow-y-auto gap-2 flex flex-col">
          <h2 className="font-bold text-2xl text-center">Descripción:</h2>
          <p>{product.description}</p>
        </div>
        <div className="divider w-[80%] flex self-center"></div>
        <div className="w-full flex justify-between items-center">
          <p className="text-lg mb-6 px-4">
            <strong>Precio:</strong> ${product.price}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            Ir al producto
          </button>
        </div>
      </div>

      <div className="w-2/3 p-4 rounded-lg ml-4 flex flex-col h-[90%] text-xl">
        <div className="w-full h-[10%] flex justify-between items-center pb-4">
          <div className="text-center w-full">
            <h2 className="badge badge-secondary text-2xl font-bold p-6">
              Conversando con {otherUserName}
            </h2>
          </div>
          <button className="btn btn-error ml-2" onClick={deleteChatHandler}>
            Eliminar chat
          </button>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto p-2 border-2 border-neutral rounded-lg bg-base-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.sender_id === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt={
                      msg.sender_id === userId
                        ? user.username
                        : otherUser?.username
                    }
                    src={
                      msg.sender_id === userId
                        ? user.avatar_img
                        : otherUser?.avatar_img
                    }
                  />
                </div>
              </div>

              <div className="chat-header">
                {msg.sender_id === userId ? "Tú" : otherUserName}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(msg.createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  {new Date(msg.createdAt).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              <div
                className={`chat-bubble ${
                  msg.sender_id === userId
                    ? "bg-primary text-black"
                    : "bg-secondary text-black"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {/* Elemento para hacer scroll automático */}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input para enviar mensajes */}
        <div className="join mt-auto flex w-full gap-4 p-2 pt-4">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="input input-bordered w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary ml-2" onClick={sendMessage}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
