import React, { useState } from "react";
import useAuthStore from "../../store/authStore";
import TransactionDetailsModal from "../../layout/Modals/TransactionDetailsModal";

const TransactionCard = ({ transaction }) => {
  const { userId } = useAuthStore();
  const [isOpenTransactionDetailsModal, setIsOpenTransactionDetailsModal] = useState(false);

  const label =
    userId === transaction.seller_id ? "Vendido" : "Adquirido";

  const labelBg =
    label === "Vendido" ? "bg-green-500" : "bg-yellow-500";

  return (
    <>
      <div className="relative card bg-base-100 shadow-xl w-72 h-72 mx-auto">
        {label && (
          <div className={`absolute top-2 -left-4 transform -rotate-45 ${labelBg} text-white px-3 py-2 text-sm font-bold`}>
            {label}
          </div>
        )}
        <figure className="flex justify-center items-center p-4">
          <img
            src={transaction.image_url}
            alt={transaction.product_name}
            className="w-32 h-32 object-cover rounded-md"
          />
        </figure>
        <div className="card-body p-4 flex flex-col justify-between">
          <h2 className="text-lg font-semibold truncate text-center">
            {transaction.product_name}
          </h2>
          <div className="mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={() => setIsOpenTransactionDetailsModal(true)}
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>
      {isOpenTransactionDetailsModal && (
        <TransactionDetailsModal
          transaction={transaction}
          onClose={() => setIsOpenTransactionDetailsModal(false)}
        />
      )}
    </>
  );
};

export default TransactionCard;
