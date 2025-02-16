import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import API from "../../../db/conn";
import axios from "axios";
import { Link } from "react-router-dom"; // Asegúrate de importar Link

const MessageButton = () => {
  const { userId } = useAuthStore();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          `${API}/api/chats/get-chats-by-user/${userId}`
        );
        setChats(response.data);
      } catch (error) {
        console.error("Error al obtener chats:", error);
      }
    };

    if (userId) {
      fetchChats();
    }
  }, [userId]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Mensajes
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {chats.map((chat) => {
          // Compara el ID y obtiene el nombre del otro usuario
          const otherUserUsername = chat.seller_id !== userId ? chat.seller_username : chat.buyer_username;
          
          return (
            <li key={chat._id} className="menu-item">
              {/* Link al chat con el nombre del usuario */}
              <Link to={`/chat/${chat._id}`}>
                {otherUserUsername ? `Chat: ${otherUserUsername}` : "Cargando..."}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MessageButton;
