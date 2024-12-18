import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSpring, animated } from "@react-spring/web";

// Mock initial revenue data
const initialRevenueData = [30, 50, 40, 60, 70, 55, 65];

function RevenueUpdates() {
  const [revenueData, setRevenueData] = useState(null); // Start with null to simulate loading

  // Function to update revenue data randomly
  const updateRevenueData = () => {
    setRevenueData((prevData) =>
      prevData.map((value) => {
        const randomChange = Math.floor(Math.random() * 10 - 5); // Random +/- 5
        return Math.max(10, value + randomChange); // Ensures values don't drop below 10
      })
    );
  };

  // Calculate the maximum value for dynamic Y-axis scaling
  const maxValue = revenueData ? Math.max(...revenueData) : 100;

  // Set up interval for live updates
  useEffect(() => {
    setTimeout(() => setRevenueData(initialRevenueData), 1000); // Simulate initial loading delay
    const interval = setInterval(updateRevenueData, 3000); // Update every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // React-Spring animation for bars
  const springProps = useSpring({
    opacity: revenueData ? 1 : 0,
    transform: revenueData ? "translateY(0)" : "translateY(20px)",
    config: { duration: 500 },
  });

  // Skeleton Loader for initial loading
  if (!revenueData) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Updates</h2>
        <Skeleton height={300} width={"100%"} />
      </div>
    );
  }

  return (
    <animated.div
      style={springProps}
      className="bg-white rounded-xl shadow-md p-6 transition-transform transform hover:scale-105"
    >
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Revenue Updates</h2>

      {/* Container for chart */}
      <div className="relative flex items-end space-x-2 sm:space-x-4 h-[300px] sm:h-[420px]">
        {/* Y-Axis */}
        <div className="absolute left-0 -ml-10 flex flex-col justify-between h-full text-gray-500 font-semibold text-sm sm:text-base">
          {Array.from({ length: 6 }).map((_, i) => {
            const value = Math.round((maxValue / 5) * (5 - i));
            return (
              <span key={i} className="transform -translate-y-1/2">
                {value}
              </span>
            );
          })}
        </div>

        {/* Bars */}
        <div className="flex items-end justify-between w-full pl-6 h-full">
          {revenueData.map((value, index) => (
            <animated.div
              key={index}
              style={{
                width: "10%", // Adjust bar width dynamically
                transform: `scaleY(${value / maxValue})`,
                transformOrigin: "bottom",
              }}
              className="flex flex-col items-center transition-transform"
            >
              <div
                className="bg-blue-500 w-full rounded-t-lg transition-all duration-500 ease-in-out hover:scale-x-110"
                style={{
                  height: `${(value / maxValue) * 300}px`, // Adjust bar height dynamically
                  maxWidth: "40px", // Set a max width for larger screens
                }}
              ></div>
              {/* Remove X-Axis Label */}
              {/* Commented out: <span className="text-sm mt-2 text-gray-600 font-semibold sm:text-base">{value}</span> */}
            </animated.div>
          ))}
        </div>
      </div>
    </animated.div>
  );
}

export default RevenueUpdates;
