import { motion } from "framer-motion";
import Ocean from "./Ocean"; // Importing the fixed Ocean component

const Background = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {/* Calling Ocean.tsx for full background */}
      {/* <Ocean /> */}

      {/* Sunlight Glow Effect
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-900 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      /> */}

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400 rounded-full opacity-30"
          style={{
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: Math.random() * 5 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Background;
