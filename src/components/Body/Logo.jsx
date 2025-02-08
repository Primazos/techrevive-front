

import { motion } from "framer-motion";

const Logo = () => {
    return (
        <motion.header
        className="bg-[rgb(0,0,21)] text-white w-full flex items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-2 w-full flex flex-col lg:flex-row items-center justify-center">
          
          
    
          {/* Contenedor del texto animado desde la derecha */}
          <motion.div
            className="text-center lg:text-center max-w-2xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-4xl font-bold">Revive la Tecnología, Cuida el Planeta </h1>
            <p className="py-6">
            En un mundo donde la tecnología avanza rápidamente, millones de componentes 
            terminan en la basura cada año. Nuestra app te ofrece una alternativa sostenible: 
            compra y vende componentes de PC de segunda mano de forma segura y accesible.
            </p>
    
            {/* Botón con animación de rebote */}
            <motion.div
              className="flex justify-center items-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
            >
              <button className="btn bg-green-600 text-white rounded-[10px] px-6 py-2">
                Ver mas
              </button>
            </motion.div>
          </motion.div>
    
        </div>
      </motion.header>
    
      
      );
}

export default Logo
