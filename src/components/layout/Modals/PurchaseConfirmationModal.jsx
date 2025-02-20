import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PurchaseConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-base-100 p-6 rounded-xl shadow-lg w-96 text-center border border-base-300"
        >
          {/* Ícono animado */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-4"
          >
            <CheckCircle className="text-primary w-16 h-16" />
          </motion.div>

          {/* Mensaje */}
          <h2 className="text-2xl font-bold text-primary">¡Gracias por confiar en TechRevive!</h2>
          <p className="text-lg text-base-content mt-2">
            Su compra se ha realizado con éxito. En breve recibirá un correo con los detalles.
          </p>
          
          {/* Botón de cierre */}
          <button className="btn btn-primary mt-5 w-full" onClick={onClose}>
            Cerrar
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PurchaseConfirmationModal;
