import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { i } from "framer-motion/client";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const { login, isAuthenticated, userId } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoggingIn(true); // Activar el estado de "Cargando"
    setMessage({ text: "", type: "" }); // Resetear el mensaje antes de intentar login

    try {
      await login(formData);
      setMessage({
        text: "Bienvenido " + formData.username + "!",
        type: "success",
      });

      // Redirigir al Home después de 3 segundos (tiempo que el mensaje estará visible)
      setTimeout(() => {
        navigate("/"); // Redirige al Home (o al Dashboard)
      }, 1500);

      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      console.log("Error al intentar login:", error); // Aquí se captura el error lanzado en el store
      setMessage({
        text:
          error.response?.data?.message ||
          "Error al iniciar sesión. Verifica tus credenciales.",
        type: "error",
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000); // Ocultar después de 3 segundos
    } finally {
      setIsLoggingIn(false); // Desactivar el estado de "Cargando"
    }
  };

  /*   useEffect(() => {
    if (isAuthenticated) {
      console.log("Usuario autenticado con ID:", userId);
      navigate("/");
      // Puedes redirigir al dashboard o a otra página aquí si lo necesitas
    }
    if (!isAuthenticated && userId) {
      console.log("No se pudo autenticar al usuario.");
    }
  }, [isAuthenticated, userId]); // Este efecto se ejecuta cuando isAuthenticated o userId cambian */

  return (
    <div className="hero bg-base-200 h-full">
      {message.text && (
        <div
          className={`alert ${
            message.type === "error" ? "alert-error" : "alert-success"
          } w-auto absolute left-1/2 top-6 z-50 transform -translate-x-1/2 p-3 rounded-lg`}
        >
          <span>{message.text}</span>
        </div>
      )}
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">¡Inicia sesión en TechRevive!</h1>
          <p className="py-6">
            Compra y vende hardware de segunda mano de forma fácil, rápida y
            segura. ¡Recicla tu tecnología y dale una segunda vida!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Usuario</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                className="input input-bordered"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="input input-bordered"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Iniciando sesión..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
