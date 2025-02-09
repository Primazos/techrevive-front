import React, { useEffect, useState } from "react";
import useAuthStore from "../components/store/authStore";
import { DATA_BUTTONS } from "../components/ui/DataProfileButton/DataButtons";
import { RxAvatar } from "react-icons/rx";
import DataDetails from "../components/ui/DataProfileButton/DataDetails";

const Profile = () => {
  const { user } = useAuthStore();
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    console.log("user profile");
    console.log(user);
  }, [user]);

  if (!user) {
    return (
      <div className="py-16 w-full h-full flex justify-center">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="py-16 w-full h-full">
      <div className="flex w-full flex-col items-center gap-4 rounded-box">
        <div className="avatar">
          <div className="ring-neutral ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
            <div>
              {user && user.avatar_img ? (
                <img
                  src={user.avatar_img}
                  alt={user.username}
                />
              ) : (
                <RxAvatar className="cover w-full h-full text-gray-500" />
              )}
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
