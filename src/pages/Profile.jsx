import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../db/conn";
import useAuthStore from "../components/store/authStore";
import { DATA_BUTTONS } from "../components/ui/DataProfileButton/DataButtons";
import { RxAvatar } from "react-icons/rx";
import DataDetails from "../components/ui/DataProfileButton/DataDetails";

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 2000);
  
     
      return () => clearTimeout(timer);
    }
  }, [message]); 

  const handleFileChange = async (e) => {
    const avatarFile = e.target.files[0];

    if (!avatarFile) {
      setMessage({ type: "error", text: "Por favor, selecciona una imagen." });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);
    formData.append("user_id", user._id); 

    setLoading(true);

    try {
      const response = await axios.put(
        `${API}/api/users/upload-avatar/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage({
        type: "success",
        text: "Avatar actualizado correctamente.",
      });
      
      updateUser({ ...user, avatar_img: response.data.avatar_img });
    } catch (error) {
      setMessage({ type: "error", text: "Error al subir avatar." });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="py-16 w-full h-full flex justify-center">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="py-16 w-full h-full">
      {message.text && (
        <div
          className={`alert alert-${message.type} w-auto absolute left-1/2 top-20 z-50 transform -translate-x-1/2`}
        >
          <span>{message.text}</span>
        </div>
      )}
      <div className="flex w-full flex-col items-center gap-4 rounded-box">
        <div className="avatar">
          <div
            className="ring-neutral ring-offset-base-100 w-44 rounded-full ring ring-offset-2 cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()} 
          >
            <div>
              {loading ? ( 
                <span className="loading loading-spinner loading-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              ) : user.avatar_img ? (
                <img
                  src={user.avatar_img}
                  alt={user.username}
                  className="w-44 h-44 rounded-full"
                />
              ) : (
                <RxAvatar className="cover w-full h-full text-gray-500" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="fileInput" 
              className="absolute opacity-0" 
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="badge badge-neutral p-4">{user.username}</div>
      </div>
      <div className="flex flex-row w-full justify-center gap-10 mt-10">
        {DATA_BUTTONS.map((button, index) => {
          return (
            <button
              className="btn"
              key={index}
              onClick={() => setSelectedButton(button.name)}
            >
              {button.icon}
              {button.name}
            </button>
          );
        })}
      </div>
      <div className="my-10">
        {selectedButton !== null && <DataDetails data={selectedButton} />}
      </div>
    </div>
  );
};

export default Profile;
