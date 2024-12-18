import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Card from "../components/Card";

// Lazy-loaded components
const SalesDistribution = lazy(() => import("../components/SalesDistribution"));
const ActiveUsers = lazy(() => import("../components/ActiveUsers"));
const PaymentGateway = lazy(() => import("../components/PaymentGateways"));
const SalesOverview = lazy(() => import("../components/SalesOverview"));
const YearlySales = lazy(() => import("../components/YearlySales"));
const RevenueUpdates = lazy(() => import("../components/RevenueUpdates"));

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dashboard"); // Updated URL
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchData();

    // Real-time updates every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex bg-cardBg min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Header />

        {loading ? (
          <div className="text-center py-10 text-lg font-semibold">Loading...</div>
        ) : (
          <>
            <Suspense fallback={<div>Loading Sales Distribution...</div>}>
              <SalesDistribution data={dashboardData.salesDistribution} />
            </Suspense>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Sales Overview */}
              <Card className="h-[400px]">
                <Suspense fallback={<div>Loading Sales Overview...</div>}>
                  <SalesOverview data={dashboardData.salesOverview} />
                </Suspense>
              </Card>

              {/* Revenue Updates */}
              <Card className="h-[400px]">
                <Suspense fallback={<div>Loading Revenue Updates...</div>}>
                  <RevenueUpdates data={dashboardData.revenueUpdates} />
                </Suspense>
              </Card>

              {/* Yearly Sales */}
              <Card className="h-[400px]">
                <Suspense fallback={<div>Loading Yearly Sales...</div>}>
                  <YearlySales data={dashboardData.yearlySales} />
                </Suspense>
              </Card>

              {/* Active Users */}
              <div className="lg:col-span-2">
                <Card >
                  <Suspense fallback={<div>Loading Active Users...</div>}>
                    <ActiveUsers data={dashboardData.activeUsers} />
                  </Suspense>
                </Card>
              </div>

              {/* Payment Gateways */}
              <div className="lg:col-span-1">
                <Card>
                  <Suspense fallback={<div>Loading Payment Gateways...</div>}>
                    <PaymentGateway data={dashboardData.paymentGateways} />
                  </Suspense>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
