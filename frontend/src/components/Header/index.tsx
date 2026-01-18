import React from "react";

const Header: React.FC = () => {
    return (
        <div
        className="container-fluid py-3"
        style={{
          background:
            "linear-gradient(90deg, #dc2626 0%, #1f1f1f 50%, #fbbf24 100%)",
          borderBottom: "2px solid rgba(255, 215, 0, 0.3)",
        }}
      >
        <h1
          className="text-center text-white mb-0 header-glow"
          style={{ letterSpacing: "4px", fontWeight: 900 }}
        >
          GUESS THE POKÉMON
        </h1>
      </div>
    );
}

export default Header;