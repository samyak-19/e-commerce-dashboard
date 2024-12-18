import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "leaflet/dist/leaflet.css";
import { activeUsers as initialData } from "../utils/api";

function ActiveUsersMap() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate data fetch on mount
  useEffect(() => {
    setTimeout(() => {
      setActiveUsers(initialData);
      setLoading(false);
    }, 2000); // Simulate 2-second loading delay
  }, []);

  // Function to simulate user growth
  const increaseUsers = () => {
    setActiveUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        users: user.users + Math.floor(Math.random() * 20 + 5), // Increase by random value between 5-25
      }))
    );
  };

  useEffect(() => {
    // Set interval to increase users every 5 seconds
    const interval = setInterval(() => {
      increaseUsers();
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const totalUsers = activeUsers.reduce((sum, user) => sum + user.users, 0);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <Skeleton height={40} width={200} />
        <Skeleton height={30} width={100} className="mt-4" />
        <Skeleton height={300} width="100%" className="mt-4" />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-md p-6 transition-transform transform hover:scale-105"
    >
      {/* Active Users Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Active Users</h2>
          <p className="text-blue-500 font-semibold text-sm">
            8.06% Vs. previous month
          </p>
        </div>
        <button className="text-blue-500 hover:underline focus:outline-none">
          Export
        </button>
      </div>

      {/* Active User Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold text-gray-800 mb-4"
      >
        {totalUsers.toLocaleString()}
      </motion.p>
      <p className="text-gray-500 text-sm mb-4">Total Active Users</p>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ height: "300px", width: "100%" }}
      >
        <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Circle Markers */}
          {activeUsers.map((user) => (
            <CircleMarker
              key={user.id}
              center={[user.lat, user.lng]}
              radius={Math.sqrt(user.users) / 4} // Adjust marker size dynamically
              color="blue"
              fillColor="blue"
              fillOpacity={0.6}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                <span>
                  {user.country}: {user.users} users
                </span>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </motion.div>
    </motion.div>
  );
}

export default ActiveUsersMap;
