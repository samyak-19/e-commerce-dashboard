import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faWallet, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { fetchTransactions } from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";

function PaymentGateways() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map icons to transaction names
  const iconMap = {
    PayPal: faPaypal,
    Wallet: faWallet,
    "Credit Card": faCreditCard,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions();
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Set an interval to refresh data every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Gateways</h2>
      <hr className="mb-4 border-gray-200" />

      {/* Transactions List */}
      {loading ? (
        // Skeleton Loader
        <ul>
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="flex items-center gap-4 py-3 animate-pulse">
              <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-12"></div>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          <AnimatePresence>
            {transactions.map((tx, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center border-b last:border-b-0 py-3"
              >
                {/* Left Section: Icon and Name */}
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={iconMap[tx.name] || faWallet} // Default to Wallet icon
                    className="text-blue-500 w-7 h-7"
                  />
                  <div>
                    <p className="font-semibold text-gray-700">{tx.name}</p>
                    <p className="text-sm text-gray-500">{tx.type}</p>
                  </div>
                </div>

                {/* Right Section: Amount */}
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`font-bold ${
                    tx.amount.startsWith("+") ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {tx.amount}
                </motion.span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* Footer Button */}
      <div className="text-center mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-blue-500 font-semibold hover:underline focus:outline-none"
          onClick={() => console.log("View all transactions")}
        >
          View all transactions
        </motion.button>
      </div>
    </div>
  );
}

export default PaymentGateways;
