import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, isAuthenticated, userId } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoggingIn(true);  // Activar el estado de "Cargando"
    
    await login(formData);

    setIsLoggingIn(false);  // Desactivar el estado de "Cargando" después de login
    
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Usuario autenticado con ID:", userId);
      navigate("/");
      // Puedes redirigir al dashboard o a otra página aquí si lo necesitas
    } else if (!isAuthenticated && userId) {
      console.log("No se pudo autenticar al usuario.");
    }
  }, [isAuthenticated, userId]);  // Este efecto se ejecuta cuando isAuthenticated o userId cambian

  return (
    <div className="hero bg-base-200 h-full">
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
              <button type="submit" className="btn btn-primary" disabled={isLoggingIn}>
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
