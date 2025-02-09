
import Logo from "../Body/Logo";

const Body = () => {
  return (
    <div className="flex w-full h-full flex-col justify-center bg-red-300">
      
      
      {/* Contenido del Logo centrado */}
      <div className="flex-grow flex justify-center">
        <Logo />
      </div>
     {/* Contenedor de Categorías debajo del Navbar */}
      <div className="mt-20 px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md text-center">Categoría 1</div>
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md text-center">Categoría 2</div>
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md text-center">Categoría 3</div>
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md text-center">Categoría 4</div>
      </div>
      
      {/* Carrusel */}
      <div className="flex justify-center items-center carousel rounded-box">
        <div className="carousel-item">
          <img src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Pizza" />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            alt="Pizza" />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
            alt="Pizza" />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
            alt="Pizza" />
        </div>
        <div className="carousel-item">
          <img src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp" alt="Pizza" />
        </div>
        <div className="carousel-item">
          <img src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp" alt="Pizza" />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
            alt="Pizza" />
        </div>
      </div>
    </div>
  );
};

export default Body;
