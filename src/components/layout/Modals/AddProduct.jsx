import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ isOpen, onClose, userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !price || images.length === 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("user_id", userId);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/products/add-product/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImages([]);
      setError("");
      onClose();
    } catch (error) {
      setError("Hubo un error al crear el producto");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-base-200 rounded-lg p-6 w-full max-w-4xl flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Agregar Producto
          </h2>
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
              <label className="block text-sm font-medium mb-2">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Categoría
              </label>
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
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Imágenes</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="btn btn-ghost">
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Subiendo..." : "Crear Producto"}
              </button>
            </div>
          </form>
        </div>

        <div className="w-1/2 pl-4">
          <h3 className="text-xl font-bold mb-4 text-primary">
            Imágenes del Producto
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Array.from(images).map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Imagen ${index + 1}`}
                  className="rounded-lg w-full h-32 object-cover"
                />
                <button
                  onClick={() =>
                    setImages([...images].filter((_, i) => i !== index))
                  }
                  className="btn btn-xs btn-circle btn-error absolute top-1 right-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
