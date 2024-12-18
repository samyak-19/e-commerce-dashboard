import React from "react";

const SkeletonLoader = ({ height = "200px", width = "100%" }) => {
  return (
    <div
      style={{
        height,
        width,
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        animation: "skeleton-loading 1.5s infinite",
      }}
      className="skeleton-loader"
    ></div>
  );
};

export default SkeletonLoader;

// Add CSS for skeleton animation
if (typeof document !== "undefined") {
  const styles = `
    @keyframes skeleton-loading {
      0% {
        background-color: #e0e0e0;
      }
      50% {
        background-color: #f0f0f0;
      }
      100% {
        background-color: #e0e0e0;
      }
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
