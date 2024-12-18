import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Initial Sales Data
const initialSalesData = [
  { id: 1, title: "Total Sales", value: 34343 },
  { id: 2, title: "By Website", value: 4500, percentage: "40%" },
  { id: 3, title: "By Mobile", value: 2800, percentage: "25%" },
  { id: 4, title: "By Market", value: 2200, percentage: "20%" },
  { id: 5, title: "By Agent", value: 1700, percentage: "15%" },
];

const SalesDistribution = () => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to simulate sales data updates
  const updateSalesData = () => {
    setSalesData((prevData) =>
      prevData.map((item) => ({
        ...item,
        value: Math.max(1000, item.value + Math.floor(Math.random() * 500 - 250)), // Random update
      }))
    );
  };

  // Simulate data fetch and live updates
  useEffect(() => {
    // Simulate an initial data fetch
    setTimeout(() => {
      setSalesData(initialSalesData);
      setIsLoading(false); // Set loading to false after data is fetched
    }, 2000);

    // Simulate live updates every 5 seconds
    const interval = setInterval(updateSalesData, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Animation for sales cards
  const cardSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 500 },
  });

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-lg p-6 w-full">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sales Distribution</h2>
      <p className="text-sm text-gray-500 mb-6">
        This is the distribution of sales across different platforms.
      </p>

      {/* Sales Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {isLoading
          ? // Show Skeleton Loader while loading
            Array(5)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center"
                >
                  <Skeleton height={40} width={100} />
                  <Skeleton height={20} width={80} style={{ marginTop: "10px" }} />
                  <Skeleton height={15} width={60} style={{ marginTop: "10px" }} />
                </div>
              ))
          : // Render Sales Data with Animations
            salesData.map((item) => (
              <animated.div
                key={item.id}
                style={cardSpring}
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {/* Value */}
                <span className="text-2xl font-bold text-gray-800 mb-2">
                  ${item.value.toLocaleString()}
                </span>

                {/* Title */}
                <span className="text-gray-600 text-sm mb-1">{item.title}</span>

                {/* Percentage */}
                {item.percentage && (
                  <span className="text-blue-500 text-xs font-medium">
                    {item.percentage}
                  </span>
                )}
              </animated.div>
            ))}
      </div>
    </div>
  );
};

export default SalesDistribution;
