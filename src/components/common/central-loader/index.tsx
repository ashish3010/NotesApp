import React from "react";

const spinnerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 50,
  left: 0,
  width: "100vw",
  height: "calc(100vh - 50px)",
  background: "rgba(0, 0, 0, 0.7)",
  zIndex: 9999,
};

const circleStyle: React.CSSProperties = {
  border: "8px solid var(--surface)",
  borderTop: "8px solid var(--btn-links)",
  borderRadius: "50%",
  width: 60,
  height: 60,
  animation: "spin 1s linear infinite",
};

const spinnerKeyframes = `
@keyframes spin {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
}
`;

const CentralLoader: React.FC = () => (
  <>
    <style>{spinnerKeyframes}</style>
    <div style={spinnerStyle}>
      <div style={circleStyle}></div>
    </div>
  </>
);

export default CentralLoader;
