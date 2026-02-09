import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect, useRef, useCallback } from "react";

const HELLO_KITTY_IMG = "https://i.pinimg.com/originals/02/21/ff/0221ff3155bd8c25c0c48a8e498e2942.png";
const EMOTIONAL_CAT_GIF = "https://media1.tenor.com/m/bXaEwAvVsTYAAAAd/crying-cat.gif";

const FloatingHeart = ({ delay, left, size, duration }) => (
  <div
    style={{
      position: "fixed",
      left: `${left}%`,
      bottom: "-40px",
      fontSize: `${size}px`,
      opacity: 0.5,
      animation: `floatUp ${duration}s ease-in infinite`,
      animationDelay: `${delay}s`,
      pointerEvents: "none",
      zIndex: 0,
    }}
  >
    💗
  </div>
);

const hearts = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  delay: Math.random() * 8,
  left: Math.random() * 100,
  size: 14 + Math.random() * 22,
  duration: 6 + Math.random() * 6,
}));

const sparkles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  delay: Math.random() * 3,
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

export default function ValentineApp() {
  const [page, setPage] = useState("ask");
  const [noPos, setNoPos] = useState({ top: null, left: null });
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const noBtnRef = useRef(null);
  const containerRef = useRef(null);

  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const btnW = 120, btnH = 50;
    const maxX = container.width - btnW - 20;
    const maxY = container.height - btnH - 20;
    const newLeft = Math.max(20, Math.random() * maxX);
    const newTop = Math.max(200, Math.random() * maxY);
    setNoPos({ top: newTop, left: newLeft });
    setNoScale(s => Math.max(0.4, s - 0.07));
    setYesScale(s => Math.min(1.5, s + 0.06));
  }, []);

  const handleYes = () => {
    setShowConfetti(true);
    setTimeout(() => setPage("yes"), 400);
  };

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(160deg, #ffe0ec 0%, #fff0f5 30%, #fce4f3 60%, #ffd6e8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Quicksand', 'Nunito', sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Pacifico&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { opacity: 0.9; }
          100% { transform: translateY(-110vh) rotate(25deg); opacity: 0; }
        }
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes celebratePop {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(3deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes rainbowGlow {
          0% { box-shadow: 0 0 30px rgba(255,105,180,0.4); }
          33% { box-shadow: 0 0 40px rgba(255,182,193,0.5); }
          66% { box-shadow: 0 0 35px rgba(255,20,147,0.4); }
          100% { box-shadow: 0 0 30px rgba(255,105,180,0.4); }
        }
        .yes-btn {
          background: linear-gradient(135deg, #ff6b9d, #ff4081, #e91e63);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 16px 44px;
          font-size: 20px;
          font-family: 'Quicksand', sans-serif;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 25px rgba(255,64,129,0.4), 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          letter-spacing: 1px;
          position: relative;
          z-index: 2;
        }
        .yes-btn:hover {
          box-shadow: 0 8px 35px rgba(255,64,129,0.55), 0 4px 12px rgba(0,0,0,0.15);
          transform: translateY(-2px);
          background: linear-gradient(135deg, #ff80ab, #ff4081, #e91e63);
        }
        .yes-btn:active { transform: translateY(0) scale(0.97); }
        .no-btn {
          background: white;
          color: #e91e63;
          border: 2.5px solid #ffb6c1;
          border-radius: 50px;
          padding: 14px 38px;
          font-size: 18px;
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 3px 12px rgba(0,0,0,0.08);
          user-select: none;
          z-index: 2;
          white-space: nowrap;
        }
        .card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 40px 32px;
          max-width: 420px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 1;
          animation: slideUp 0.8s ease-out, rainbowGlow 3s ease-in-out infinite;
          border: 2px solid rgba(255,182,193,0.4);
        }
        @media (max-width: 500px) {
          .card {
            padding: 28px 20px;
            border-radius: 24px;
            max-width: 92vw;
          }
          .yes-btn {
            padding: 14px 36px;
            font-size: 18px;
          }
          .no-btn {
            padding: 12px 30px;
            font-size: 16px;
          }
        }
      `}</style>

      {hearts.map(h => <FloatingHeart key={h.id} {...h} />)}

      {showConfetti && Array.from({ length: 40 }, (_, i) => (
        <div
          key={`conf-${i}`}
          style={{
            position: "fixed",
            left: `${Math.random() * 100}%`,
            top: "-5%",
            width: `${8 + Math.random() * 10}px`,
            height: `${8 + Math.random() * 10}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            background: ["#ff4081","#ff80ab","#e91e63","#f8bbd0","#ffeb3b","#ff6090","#f48fb1","#ce93d8"][i % 8],
            animation: `confettiFall ${1.5 + Math.random() * 2}s ease-in forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
            zIndex: 100,
            pointerEvents: "none",
          }}
        />
      ))}

      {page === "ask" && (
        <div className="card">
          <div
            style={{
              animation: "gentleBounce 2.5s ease-in-out infinite",
              marginBottom: "20px",
            }}
          >
            <img
              src={HELLO_KITTY_IMG}
              alt="Hello Kitty"
              style={{
                width: "160px",
                height: "160px",
                objectFit: "contain",
                filter: "drop-shadow(0 8px 20px rgba(255,105,180,0.3))",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          <div style={{ marginBottom: "4px" }}>
            <span style={{
              fontSize: "14px",
              color: "#f48fb1",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}>
              ✧ A Special Question ✧
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: "clamp(26px, 6vw, 36px)",
              color: "#d81b60",
              margin: "12px 0 6px",
              lineHeight: 1.3,
              animation: "pulse 3s ease-in-out infinite",
            }}
          >
            Hello Ju! 💕
          </h1>

          <p
            style={{
              fontSize: "clamp(18px, 4.5vw, 22px)",
              color: "#ad1457",
              fontWeight: 600,
              margin: "8px 0 28px",
              lineHeight: 1.5,
            }}
          >
            Will you be my Valentine? 🥺💗
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              position: "relative",
              minHeight: "140px",
            }}
          >
            <button
              className="yes-btn"
              onClick={handleYes}
              style={{
                transform: `scale(${yesScale})`,
                transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              Yes! 💖
            </button>

            <button
              ref={noBtnRef}
              className="no-btn"
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
              onClick={moveNoButton}
              style={{
                ...(noPos.top !== null
                  ? {
                      position: "absolute",
                      top: `${noPos.top}px`,
                      left: `${noPos.left}px`,
                    }
                  : {}),
                transform: `scale(${noScale})`,
                transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              No 😿
            </button>
          </div>

          <p
            style={{
              fontSize: "12px",
              color: "#f48fb1",
              marginTop: "20px",
              fontStyle: "italic",
              opacity: noScale < 0.8 ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            Hehe... the No button seems shy! 🙈
          </p>
        </div>
      )}

      {page === "yes" && (
        <div className="card" style={{ animation: "celebratePop 0.6s ease-out, rainbowGlow 3s ease-in-out infinite" }}>
          {sparkles.map(s => (
            <div
              key={s.id}
              style={{
                position: "absolute",
                left: `${s.left}%`,
                top: `${s.top}%`,
                fontSize: "16px",
                animation: `sparkle 2s ease-in-out infinite`,
                animationDelay: `${s.delay}s`,
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              ✨
            </div>
          ))}

          <div style={{
            fontSize: "40px",
            marginBottom: "8px",
            animation: "wiggle 0.5s ease-in-out infinite",
          }}>
            🎉💗🎉
          </div>

          <h1
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: "clamp(28px, 7vw, 40px)",
              background: "linear-gradient(135deg, #e91e63, #ff4081, #d81b60, #ff80ab)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
              margin: "0 0 12px",
              lineHeight: 1.3,
            }}
          >
            Yayyyyy!
          </h1>

          <p
            style={{
              fontSize: "clamp(18px, 4.5vw, 24px)",
              color: "#ad1457",
              fontWeight: 700,
              margin: "0 0 24px",
              lineHeight: 1.4,
            }}
          >
            I'm on cloud nine! ☁️💕
          </p>

          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              margin: "0 auto 20px",
              maxWidth: "280px",
              boxShadow: "0 8px 30px rgba(233,30,99,0.25)",
              border: "3px solid #ffb6c1",
              animation: "pulse 2.5s ease-in-out infinite",
            }}
          >
            <img
              src={EMOTIONAL_CAT_GIF}
              alt="Happy emotional cat"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          <p style={{
            fontSize: "clamp(14px, 3.5vw, 16px)",
            color: "#e91e63",
            fontWeight: 600,
            margin: "0",
            lineHeight: 1.6,
          }}>
            You've made me the happiest! 🥹💖
            <br />
            <span style={{ fontSize: "clamp(12px, 3vw, 14px)", color: "#f48fb1" }}>
              Forever & always, with love 💗
            </span>
          </p>

          <div style={{
            marginTop: "20px",
            fontSize: "24px",
            animation: "gentleBounce 2s ease-in-out infinite",
          }}>
            🐱💕🐱
          </div>
        </div>
      )}
    </div>
  );
}