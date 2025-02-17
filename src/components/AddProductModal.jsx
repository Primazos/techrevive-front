import React, { useState } from "react";

const AddProductModal = ({ isOpen, onClose, userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!title || !description || !category || !price || imageUrls.length === 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Crear el objeto del producto
    const product = {
      title,
      description,
      category,
      price: parseFloat(price),
      image_urls: imageUrls,
      user_id: userId, // Incluir el user_id del usuario registrado
    };

    try {
      // Enviar los datos a la base de datos
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el producto.");
      }

      // Limpiar el formulario y cerrar el modal
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImageUrls([]);
      setError("");
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-base-200 rounded-lg p-6 w-full max-w-4xl flex">
        {/* Contenedor izquierdo: Formulario */}
        <div className="w-1/2 pr-4">
          <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
          {error && <div className="alert alert-error mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Categoría</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Precio</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="btn btn-ghost">
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>

        {/* Contenedor derecho: Imágenes */}
        <div className="w-1/2 pl-4">
          <h3 className="text-xl font-bold mb-4">Imágenes del Producto</h3>
          <div className="grid grid-cols-2 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  className="rounded-lg w-full h-32 object-cover"
                />
                <button
                  onClick={() =>
                    setImageUrls(imageUrls.filter((_, i) => i !== index))
                  }
                  className="btn btn-xs btn-circle btn-error absolute top-1 right-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Agregar URL de imagen"
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.target.value) {
                setImageUrls([...imageUrls, e.target.value]);
                e.target.value = "";
              }
            }}
            className="input input-bordered w-full mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;