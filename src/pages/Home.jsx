import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../components/ui/Logo/Logo";
import CategoryCard from "../components/ui/Card/CategoryCard";
import { CATEGORIES } from "../components/ui/CategoryList/CategoryList";

const Home = () => {
  return (
    <div className="flex w-full h-full flex-col justify-around">
      <div className="flex justify-center">
        <Logo />
      </div>
      <motion.div
        className="w-[85%] shadow-xl rounded-xl self-center py-6 bg-base-300"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Explora nuestras categorías
          </h1>
        </div>
        <div className="flex flex-row flex-wrap gap-6 px-6 justify-around py-6">
          {CATEGORIES.map((category, index) => {
            return (
              <div
                key={index}
                className="shadow-xl transition-transform transform hover:scale-105 hover:cursor-pointer"
              >
                <Link
                  to={`/products-by-category/${category.ddbb_name}`}
                  className="shadow-xl transition-transform transform hover:scale-105 hover:cursor-pointer"
                >
                  <CategoryCard item={category} />
                </Link>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
