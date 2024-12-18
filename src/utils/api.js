// src/utils/api.js

// Helper to generate random amounts
const generateRandomAmount = () => {
  const isPositive = Math.random() > 0.5;
  const amount = (Math.random() * 5000).toFixed(2); // Generate a random amount between 0 and 5000
  return `${isPositive ? "+" : "-"}$${amount}`;
};

// Helper to shuffle payment gateway names
const paymentGateways = [
  { name: "PayPal", type: "Big Brands" },
  { name: "Wallet", type: "Bill Payment" },
  { name: "Credit Card", type: "Bill Payment" },
];

// Function to generate random transactions
export const fetchTransactions = async () => {
  return paymentGateways.map((gateway) => ({
    name: gateway.name,
    type: gateway.type,
    amount: generateRandomAmount(),
  }));
};

// Active user data for maps (if needed elsewhere)
export const activeUsers = [
  { id: 1, country: "USA", lat: 37.0902, lng: -95.7129, users: 1200 },
  { id: 2, country: "India", lat: 20.5937, lng: 78.9629, users: 950 },
  { id: 3, country: "Brazil", lat: -14.235, lng: -51.9253, users: 700 },
  { id: 4, country: "Germany", lat: 51.1657, lng: 10.4515, users: 400 },
  { id: 5, country: "Australia", lat: -25.2744, lng: 133.7751, users: 300 },
];

// Sales data mock fetch
export const fetchSalesData = async () => {
  const mockData = [
    { id: 1, title: "Product Sales Analysis" },
    { id: 2, title: "Marketing Campaign" },
    { id: 3, title: "Customer Feedback" },
    { id: 4, title: "New Launch Stats" },
    { id: 5, title: "Subscription Growth" },
  ];

  return mockData.map((item) => ({
    name: item.title.substring(0, 10),
    value: Math.floor(Math.random() * 5000),
  }));
};
