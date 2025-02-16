import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import MessageButton from "./MessageButton";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout, user } = useAuthStore();

  useEffect(() => {
    console.log(user); // 🔍 Verifica que el usuario se está cargando
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return location.pathname !== "/login" ? (
      <div className="navbar bg-base-100 fixed top-0 z-50 mb-16 border-b border-neutral">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            TechRevive
          </Link>
        </div>
        <div className="flex-none"></div>
        <Link to="/login">
          <button className="btn">
            Entrar <IoMdLogIn size={30} />
          </button>
        </Link>
      </div>
    ) : (
      // Aquí iría lo que quieres que se renderice en el caso de que estés en /login
      <div className="navbar bg-base-100 fixed top-0 z-50 mb-16 border-b border-neutral">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            TechRevive
          </Link>
        </div>
        <div className="flex-none"></div>
        <Link to="/sign-in">
          <button className="btn">
            Regístrate <IoMdLogIn size={30} />
          </button>
        </Link>
      </div>
    );
  }

  if (location.pathname === "/login" && !isAuthenticated) {
    return (
      <div className="navbar bg-base-100 fixed top-0 z-50 mb-16 border-b border-neutral">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            TechRevive
          </Link>
        </div>
        <div className="flex-none"></div>
        <Link to="/login">
          <button className="btn">
            Registrarse <IoMdLogIn size={30} />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 fixed top-0 z-50 mb-16 border-b border-neutral">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          TechRevive
        </Link>
      </div>
      <div className="flex-none"></div>
      {location.pathname === "/profile" ? (
         <>
         <MessageButton />
         <button className="btn" onClick={handleLogout}>
           Salir <AiOutlineLogout size={30} />
         </button>
       </>
      ) : (
        <Link to="/profile">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user && user.avatar_img ? (
                  <img
                    alt="User Avatar"
                    src={user.avatar_img}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <RxAvatar className="w-10 h-10 text-gray-500" /> // Aquí mostramos el ícono de avatar
                )}
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
