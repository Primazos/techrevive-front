import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import API from "../../../db/conn";

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
    email: "",
    phone: "",
    location: {
      city: "",
      region: "",
      country: "",
    },
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.location) {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar los datos al backend para crear el usuario
      const response = await axios.post(`${API}/api/users/add-user/`, formData);
      setSuccess(true); // Si la respuesta es exitosa
      console.log(response.data); // Aquí puedes hacer algo con la respuesta, si es necesario
    } catch (error) {
      setError("Hubo un error al crear el usuario."); // En caso de error
      console.error("Error al crear usuario:", error);
    }
  };

  if (success) return <Navigate to="/login" />;
  if (error) return <div>Error: {error}</div>;


  return (
    <div className="hero bg-base-200 h-full">
      <div className="hero-content flex-col w-full">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl text-center font-bold">
            ¡Bienvenido a TechRevive!
          </h1>
          <p className="py-6">
            Compra y vende hardware de segunda mano de manera fácil y segura.
            ¡Recicla tu tecnología y dale nueva vida!
          </p>
        </div>
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  className="input input-bordered"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

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
                  <span className="label-text">Correo electrónico</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="input input-bordered"
                  required
                  value={formData.email}
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Género</span>
                </label>
                <select
                  name="gender"
                  className="select select-bordered"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Selecciona el género
                  </option>
                  <option value="hombre">Masculino</option>
                  <option value="mujer">Femenino</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Teléfono (opcional)</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Número de teléfono"
                  className="input input-bordered"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Campos de ubicación */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Ciudad</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Ciudad"
                  className="input input-bordered"
                  value={formData.location.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Región</span>
                </label>
                <input
                  type="text"
                  name="region"
                  placeholder="Región"
                  className="input input-bordered"
                  value={formData.location.region}
                  onChange={handleChange}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">País</span>
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="País"
                  className="input input-bordered"
                  value={formData.location.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
