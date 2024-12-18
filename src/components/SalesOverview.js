import React, { useEffect, useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "./Card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { fetchSalesData } from "../utils/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesOverview = React.memo(() => {
  const [salesData, setSalesData] = useState(null); // Start with null to indicate loading state

  useEffect(() => {
    const loadSalesData = async () => {
      try {
        const data = await fetchSalesData();
        const profit = data[0]?.value || 0;
        const expense = data[1]?.value || 0;
        const totalSales = profit + expense;

        setSalesData({
          profit,
          expense,
          totalSales,
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    loadSalesData();
  }, []);

  const chartData = useMemo(
    () => ({
      labels: ["Profit", "Expense"],
      datasets: [
        {
          data: [salesData?.profit || 0, salesData?.expense || 0],
          backgroundColor: ["#3B82F6", "#06B6D4"],
          hoverBackgroundColor: ["#2563EB", "#0E7490"],
          borderWidth: 0,
        },
      ],
    }),
    [salesData]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      animation: {
        duration: 1000, // Smooth chart animation
        easing: "easeInOutQuart",
      },
      plugins: {
        tooltip: {
          enabled: true,
        },
        legend: {
          display: false,
        },
      },
    }),
    []
  );

  // Framer Motion Variants for animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!salesData) {
    // Render skeleton loader during data fetching
    return (
      <Card title="Sales Overview">
        <div className="flex flex-col items-center">
          <Skeleton height={200} width={200} circle={true} />
          <div className="mt-4">
            <Skeleton width={120} />
            <Skeleton width={100} />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card title="Sales Overview">
        <div className="flex flex-col items-center">
          {/* Doughnut Chart */}
          <motion.div
            className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Doughnut data={chartData} options={options} />
            <div
              className="absolute flex flex-col items-center justify-center text-center"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            >
              <p className="text-xs sm:text-sm text-gray-500">Total Sales</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-800">
                ${salesData.totalSales.toLocaleString()}
              </p>
            </div>
          </motion.div>

          {/* Sales Details */}
          <motion.div
            className="flex flex-col space-y-2 sm:space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-blue-500 font-bold text-sm sm:text-base">
              Profit: ${salesData.profit.toLocaleString()}
            </p>
            <p className="text-cyan-500 font-bold text-sm sm:text-base">
              Expense: ${salesData.expense.toLocaleString()}
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
});

export default SalesOverview;
