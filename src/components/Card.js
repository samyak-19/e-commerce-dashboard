import React from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Card Component
const Card = ({ title, children, isLoading = false }) => {
  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white p-6 rounded-xl shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {isLoading ? (
        <div>
          <Skeleton height={20} className="mb-4" />
          <Skeleton count={2} />
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default Card;
