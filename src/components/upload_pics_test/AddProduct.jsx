import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [title, setTitle] = useState("producto prueba");
  const [description, setDescription] = useState(
    "Descripcion de producto prueba"
  );
  const [category, setCategory] = useState("disco duro");
  const [price, setPrice] = useState("60");
  const [user_id, setUserId] = useState("d772c84f-0ae5-403d-96b9-d45247dbd5dd");
  const [images, setImages] = useState([]); // Almacena archivos, no base64
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setImages(event.target.files); // Guardar los archivos sin procesarlos
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!title || !price || !user_id || images.length === 0) {
      return alert("¡Por favor completa todos los campos!");
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("user_id", user_id);

    // Agregar imágenes al FormData
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

      alert("Producto creado con éxito!");
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al crear el producto", error);
      alert("Hubo un error al crear el producto");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Formulario de Producto</h1>
      <form onSubmit={handleUpload}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingrese el título"
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingrese la descripción"
          />
        </div>

        <div>
          <label>Categoría:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ingrese la categoría"
          />
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ingrese el precio"
          />
        </div>

        <div>
          <label>Usuario (ID):</label>
          <input
            type="text"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Ingrese el ID de usuario"
          />
        </div>

        <div>
          <label>Imágenes:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Subiendo..." : "Crear Producto"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
