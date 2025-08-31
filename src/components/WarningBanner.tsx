import React from "react";

const WarningBanner: React.FC = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "8px 16px",
        backgroundColor: "#fff3cd",
        color: "#856404",
        border: "1px solid #ffeaa7",
        borderRadius: "4px",
        margin: "8px auto",
        maxWidth: "600px",
        fontSize: "14px",
        fontWeight: "500"
      }}
    >
      ⚠️ Some of the packages need to click on "Save as HTML" to work!
    </div>
  );
};

export default WarningBanner;
