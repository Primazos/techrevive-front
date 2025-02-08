import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../db/conn";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const location = useLocation();

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
    <div className="navbar bg-base-100 fixed top-0 z-50 mb-16 border-b border-neutral">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          TechRevive
        </Link>
      </div>
      <div className="flex-none">
        {location.pathname === "/profile" ? (
          <div className="btn btn-ghost btn-circle">
            <AiOutlineLogout size={30} />
          </div>
        ) : (
          <Link to="/profile">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user.avatar_img}
                    /* src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" */
                  />
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
