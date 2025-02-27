import { motion } from "framer-motion";
import logo from "../../../assets/images/techrevive_logo.png";

const Logo = () => {
  return (
    <motion.header
      className="text-white w-full flex items-center py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-2 flex gap-20 flex-col lg:flex-row items-center justify-center">
        <motion.img
          src={logo}
          className="w-60 h-auto rounded-lg"
          alt="Logo TechRevive"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        <motion.div
          className="text-center lg:text-center max-w-2xl"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white">
            Revive la Tecnología, Cuida el Planeta{" "}
          </h1>
          <p className="py-6 text-xl">
            En un mundo donde la tecnología avanza rápidamente, millones de
            componentes terminan en la basura cada año. Nuestra app te ofrece
            una alternativa sostenible: compra y vende componentes de PC de
            segunda mano de forma segura y accesible.
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Logo;
