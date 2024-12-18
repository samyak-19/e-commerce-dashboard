import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useSpring, animated } from "@react-spring/web";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

// Sample data for multiple years
const data = [
  { year: 2021, month: "Jan", profit: 4000, expenses: 2400 },
  { year: 2021, month: "Feb", profit: 3000, expenses: 2210 },
  { year: 2021, month: "Mar", profit: 5000, expenses: 2290 },
  { year: 2021, month: "Apr", profit: 7000, expenses: 2800 },
  { year: 2022, month: "May", profit: 6000, expenses: 3200 },
  { year: 2022, month: "Jun", profit: 4000, expenses: 2700 },
  { year: 2022, month: "Jul", profit: 8000, expenses: 4000 },
  { year: 2022, month: "Aug", profit: 7500, expenses: 3500 },
  { year: 2023, month: "Sep", profit: 6500, expenses: 2900 },
  { year: 2023, month: "Oct", profit: 7000, expenses: 3000 },
  { year: 2023, month: "Nov", profit: 6000, expenses: 2700 },
  { year: 2023, month: "Dec", profit: 9000, expenses: 4500 },
];

// Extract unique years from the data
const uniqueYears = [...new Set(data.map((item) => item.year))];

function YearlySales() {
  const [selectedYear, setSelectedYear] = useState(uniqueYears[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Mock loading delay
    return () => clearTimeout(timer);
  }, [selectedYear]);

  // Filter data based on the selected year
  const filteredData = data.filter((item) => item.year === selectedYear);

  // Calculate yearly sales total
  const yearlySales = filteredData.reduce(
    (sum, item) => sum + item.profit + item.expenses,
    0
  );

  // Spring animation for transitions
  const transition = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? "translateY(20px)" : "translateY(0px)",
    config: { duration: 500 },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-lg shadow-lg p-4 md:p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      {/* Title */}
      <h2 className="text-lg md:text-xl font-bold text-gray-700 mb-4">
        Yearly Sales
      </h2>

      {/* Year Selection */}
      <div className="flex flex-wrap justify-end mb-4">
        <label
          className="text-sm md:text-base text-gray-600 font-medium mr-2"
          htmlFor="year"
        >
          Select Year:
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm md:text-base focus:outline-none focus:border-blue-500"
        >
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Chart or Skeleton Loader */}
      {loading ? (
        <div className="w-full h-56 sm:h-72 md:h-96">
          <Skeleton height="100%" />
        </div>
      ) : (
        <animated.div style={transition}>
          <div className="w-full h-56 sm:h-72 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6B7280", fontSize: 10 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 10 }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", borderColor: "#ddd" }}
                  cursor={{ stroke: "rgba(0,0,0,0.1)", strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#22C55E"
                  fill="url(#colorProfit)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#EF4444"
                  fill="url(#colorExpenses)"
                  strokeWidth={2}
                />
                {/* Gradients */}
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </animated.div>
      )}

      {/* Yearly Sales Total */}
      <div className="mt-4 md:mt-6 text-center">
        <h3 className="text-base md:text-lg font-bold text-gray-700">
          Total Yearly Sales
        </h3>
        <p className="text-xl md:text-2xl font-semibold text-blue-600">
          ${yearlySales.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}

export default YearlySales;
