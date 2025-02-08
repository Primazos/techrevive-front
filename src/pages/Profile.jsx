import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../db/conn";
import { DATA_BUTTONS } from "../components/ui/DataProfileButton/DataButtons";
import DataDetails from "../components/ui/DataProfileButton/DataDetails";

const Profile = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = "d79829b7-fe37-4561-b7e8-dcbe811dd853";

  useEffect(() => {
    axios
      .get(`${API}/api/users//get-user/${userId}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-16 w-full h-full">
      <div className="flex w-full flex-col items-center gap-4 rounded-box">
        <div className="avatar">
          <div className="ring-neutral ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
            <div>
              <img src={user.avatar_img} alt={user.username} />
            </div>
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
