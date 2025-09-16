import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Home = ({ navigate }) => { // Pass navigate prop
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <>
      <div
        onMouseMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
      >
        <motion.div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            style={{
              x: useTransform(x, [0, window.innerWidth], [-100, 100]),
              y: useTransform(y, [0, window.innerHeight], [-100, 100]),
              willChange: "transform, opacity",
              mixBlendMode: "screen",
              transition: "none"
            }}
            className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-blue-400 opacity-20 blur-3xl rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 8 }}
          />
          <motion.div
            style={{
              x: useTransform(x, [0, window.innerWidth], [50, -50]),
              y: useTransform(y, [0, window.innerHeight], [50, -50]),
              willChange: "transform, opacity",
              mixBlendMode: "screen",
              transition: "none"
            }}
            className="absolute bottom-[15%] right-[15%] w-[30rem] h-[30rem] bg-fuchsia-500 opacity-20 blur-3xl rounded-full"
            animate={{ scale: [1, 0.95, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
        </motion.div>
        <motion.div
          className="z-10 backdrop-blur-xl bg-white/10 border border-white/10 rounded-xl p-10 shadow-2xl text-center max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            Welcome to <span className="text-blue-400">the Gallery</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            Explore a curated collection of my artwork.
          </p>
        </motion.div>
      </div>
    </>
  );
};

const Art = ({ navigate }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [selectedPainting, setSelectedPainting] = useState(null);

  return (
    <>
      <div
        onMouseMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
      >
        <motion.div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            style={{
              x: useTransform(x, [0, window.innerWidth], [-100, 100]),
              y: useTransform(y, [0, window.innerHeight], [-100, 100]),
              willChange: "transform, opacity",
              mixBlendMode: "screen",
              transition: "none",
            }}
            className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-blue-400 opacity-20 blur-3xl rounded-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 8 }}
          />
          <motion.div
            style={{
              x: useTransform(x, [0, window.innerWidth], [50, -50]),
              y: useTransform(y, [0, window.innerHeight], [50, -50]),
              willChange: "transform, opacity",
              mixBlendMode: "screen",
              transition: "none",
            }}
            className="absolute bottom-[15%] right-[15%] w-[30rem] h-[30rem] bg-fuchsia-500 opacity-20 blur-3xl rounded-full"
            animate={{ scale: [1, 0.95, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
          />
        </motion.div>
        <motion.div
          className="z-10 backdrop-blur-xl bg-white/10 border border-white/10 rounded-xl p-10 shadow-2xl text-center max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            My <span className="text-blue-400">Art</span>
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed mb-8">
            A showcase of my creative works.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
            {Array.from({ length: 7 }, (_, i) => `painting${i + 1}.jpeg`).map((file, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={`/model/paintings/${file}`}
                  alt={`Painting ${i + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg cursor-pointer"
                  onClick={() => setSelectedPainting(`/model/paintings/${file}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPainting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedPainting(null);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative bg-black/40 p-2 rounded-lg backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPainting}
                alt="Enlarged Painting"
                className="max-h-[80vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg"
                style={{ margin: 'auto' }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-3 -right-3 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 w-8 h-8 flex items-center justify-center text-sm shadow-lg"
                onClick={() => setSelectedPainting(null)}
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Navbar = ({ navigate, currentPage }) => { // Pass navigate and currentPage
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setIsInside(true);
  const handleMouseLeave = () => setIsInside(false);

  // Helper for nav magnetic effect using Framer Motion animate API
  const magneticMotionDiv = (to, label) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    return (
      <motion.div
        className="inline-block"
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseMove={(e) => {
          const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
          const newX = (e.clientX - (left + width / 2)) * 0.3;
          const newY = (e.clientY - (top + height / 2)) * 0.3;
          setX(newX);
          setY(newY);
        }}
        onMouseLeave={() => {
          setX(0);
          setY(0);
        }}
      >
        <button
          onClick={() => navigate(to)} // Use navigate prop
          className="relative px-2 py-1 rounded transition duration-300 hover:bg-white/10 hover:shadow-glow nav-item"
        >
          {label}
        </button>
      </motion.div>
    );
  };

  return (
    <nav
      className="relative z-20 flex justify-between items-center px-6 py-4 bg-black/30 text-white shadow-md backdrop-blur-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute w-56 h-56 pointer-events-none rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(96,165,250,0.7), rgba(139,92,246,0.4), rgba(236,72,153,0.2))",
          mixBlendMode: "screen",
          filter: "blur(60px)",
          willChange: "transform, opacity",
          transition: "none",
        }}
        animate={{
          top: cursorPos.y - 112,
          left: cursorPos.x - 112,
          opacity: isInside ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 24,
        }}
      />
      <button
        onClick={() => navigate("/")} // Use navigate prop
        className="text-2xl font-bold transition duration-300 hover:text-blue-400 hover:drop-shadow-glow nav-item"
      >
        Harsha Mullangi's Gallery
      </button>
      <div className="space-x-6 flex items-center">
        {magneticMotionDiv("/art", "Art")}
        {magneticMotionDiv("/about", "About Me")}
      </div>
    </nav>
  );
}

const About = () => (
  <>
    <div className="p-6 min-h-screen text-white flex items-center justify-center bg-gray-900/20 transition-colors duration-1000">
      <motion.div
        className="max-w-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-xl text-white shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-4">About the Artist</h2>
        <p className="text-gray-200 leading-relaxed">
          Hi! I'm Harsha Mullangi, a passionate artist and developer. I love creating art, especially realism paintings, and sharing it with the world. This gallery is a collection of my favorite works, showcasing my journey and growth as an artist.
          <br /><br />
          When I'm not painting, I enjoy exploring new technologies and building creative projects.
          <br /><br />
          Thank you for visiting my gallery!
        </p>
      </motion.div>
    </div>
  </>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState("/");
  const [prevPath, setPrevPath] = useState("/");
  const [transitionDirection, setTransitionDirection] = useState(1);

  const navigate = (path) => {
    setPrevPath(currentPage);
    setCurrentPage(path);
  };

  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const isFromHome = prevPath === "/";
    setIsTransitioning(isFromHome);
    const timeout = setTimeout(() => setIsTransitioning(false), isFromHome ? 600 : 0);
    return () => clearTimeout(timeout);
  }, [currentPage, prevPath]);

  let transitionColor = "#0f172a";
  switch (currentPage) {
    case "/about":
      transitionColor = "#111827";
      break;
    default:
      transitionColor = "#0f172a";
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #0f172a; /* Default background */
            transition: background-color 0.5s ease-in-out;
          }
          .shadow-glow {
            text-shadow: 0 0 8px rgba(96, 165, 250, 0.6), 0 0 12px rgba(96, 165, 250, 0.4);
          }
          .nav-item:hover {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.1);
          }
        `}
      </style>
      {/* Animated particles background */}
      <Particles
        id="tsparticles"
        init={async (engine) => { await loadSlim(engine); }}
        className="fixed top-0 left-0 w-full h-full z-0"
        options={{
          fullScreen: false,
          particles: {
            number: { value: 30 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.2 },
            size: { value: 2 },
            move: { enable: true, speed: 0.5 }
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } }
          },
          background: { color: "transparent" }
        }}
      />
      {/* Animated orb morphing transition */}
      <AnimatePresence mode="wait">
        {isTransitioning && prevPath === "/" && (
          <motion.div
            key="page-orb"
            className="fixed top-1/2 left-1/2 w-48 h-48 rounded-full z-50"
            style={{
              backgroundColor:
                currentPage === "/art"
                  ? "#3b82f6" // A color for the Art page
                  : "#111827",
              filter: "blur(80px)",
              mixBlendMode: "screen",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 40, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
      <Navbar navigate={navigate} currentPage={currentPage} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {(() => {
            switch (currentPage) {
              case "/":
                return <Home navigate={navigate} />;
              case "/art":
                return <Art navigate={navigate} />;
              case "/about":
                return <About />;
              default:
                return <Home navigate={navigate} />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    </>
  );
}