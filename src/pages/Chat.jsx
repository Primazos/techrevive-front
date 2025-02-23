import React, { useEffect, useState, useRef } from "react";
import useAuthStore from "../components/store/authStore";
import axios from "axios";
import API from "../db/conn";
import { useParams, useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const { userId, user } = useAuthStore(); // Usuario autenticado
  const { idChat } = useParams();
  const [chat, setChat] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [otherUserName, setOtherUserName] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Desplazar automáticamente hacia abajo al agregar mensajes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;
    const newMessage = {
      chat_id: idChat,
      sender_id: userId,
      content: inputValue,
    };

    try {
      const response = await axios.post(`${API}/api/messages/add-message`, newMessage);
      const savedMessage = response.data;
      setMessages([...messages, savedMessage]);
      setInputValue("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const deleteChatHandler = async () => {
    try {
      await axios.delete(`${API}/api/messages/delete-all-messages/${idChat}`);
      const response = await axios.delete(`${API}/api/chats/delete-chat/${idChat}`);
      if (response.data) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error al eliminar el chat y los mensajes:", error);
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
        setLoading(false);
      }
    };

    if (idChat) fetchChat();
  }, [idChat, userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${API}/api/messages/get-messages/${idChat}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error al obtener los mensajes:", error);
      }
    };

    if (idChat) fetchMessages();
  }, [idChat]);

  useEffect(() => {
    const fetchOtherUser = async () => {
      if (!chat) return;
      const otherUserId = userId === chat.seller_id ? chat.buyer_id : chat.seller_id;
      try {
        const response = await axios.get(`${API}/api/users/get-user/${otherUserId}`);
        setOtherUser(response.data);
      } catch (error) {
        console.error("Error al obtener el otro usuario:", error);
      }
    };

    if (chat && userId) {
      fetchOtherUser();
    }
  }, [chat, userId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (chat) {
          const response = await axios.get(`${API}/api/products/get-product/${chat.product_id}`);
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    if (chat) fetchProduct();
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
    <>
      <div className="flex bg-base-300 p-6 rounded-lg w-full h-screen gap-4">
        {/* Sección de Producto (más estrecha) */}
        <div className="basis-1/3 h-full p-4 rounded-lg bg-neutral flex flex-col justify-between">
          <img
            src={product.image_urls[0]}
            alt={product.title}
            className="w-full h-1/2 object-cover rounded-md"
          />
          <h2 className="font-bold text-2xl text-center">{product.title}</h2>
          <div className="divider w-[80%] self-center"></div>
          <div className="text-lg px-4 max-h-40 overflow-y-auto flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-center">Descripción:</h2>
            <p>{product.description}</p>
          </div>
          <div className="divider w-[80%] self-center"></div>
          <div className="w-full flex justify-between items-center">
            <p className="text-lg mb-6 px-4">
              <strong>Precio:</strong> {product.price} €
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              Ir al producto
            </button>
          </div>
        </div>

        {/* Sección de Chat (más ancha) */}
        <div className="basis-2/3 h-full p-4 rounded-lg flex flex-col bg-base-100 text-xl">
          <div className="w-full h-[10%] flex justify-between items-center pb-4">
            <div className="text-center w-full">
              <h2 className="badge badge-secondary text-2xl font-bold p-6">
                Conversando con {otherUserName}
              </h2>
            </div>
            <button
              className="btn btn-error ml-2"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Eliminar chat
            </button>
          </div>
          <div className="flex flex-col flex-grow overflow-y-auto p-2 border-2 border-neutral rounded-lg bg-base-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${msg.sender_id === userId ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt={msg.sender_id === userId ? user.username : otherUser?.username}
                      src={msg.sender_id === userId ? user.avatar_img : otherUser?.avatar_img}
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
                    msg.sender_id === userId ? "bg-primary text-black" : "bg-secondary text-black"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {/* Elemento para scroll automático */}
            <div ref={chatEndRef}></div>
          </div>
          <div className="join mt-auto flex w-full gap-4 p-2 pt-4">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="input input-bordered w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación para eliminar el chat */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="card bg-base-200 shadow-xl w-96">
            <div className="card-body">
              <h2 className="text-xl font-bold">
                ¿Estás seguro de que deseas eliminar este chat?
              </h2>
              <div className="card-actions justify-between mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    deleteChatHandler();
                    setIsDeleteModalOpen(false);
                  }}
                >
                  Eliminar Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
