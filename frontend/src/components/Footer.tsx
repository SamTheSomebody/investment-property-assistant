import React from "react"

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-screen h-40 overflow-hidden bg-gradient-to-t from-purple-darkest text-white z-9">

      {/*Vertical lines*/}
      <div>
        {Array.from({ length: 20 }).map((_, i) => {
          const opacity = 1 - i * 0.05;
          const scaleY = 2 - i * 0.05;
          return (
            <div
              key={i}
              className="absolute w-full h-px bg-purple-dark"
              style={{
                bottom: `${i * 8}px`,
                opacity,
                transform: `scaleY(${scaleY})`,
              }}
            />
          );
        })}
      </div>

      {/* Footer text */}
      <div className="relative z-10 flex items-end justify-end h-full p-4 text-sm text-gray-400">
        Property Investment Assistant v.0.01
      </div>
    </footer>
  );
};

export default Footer;
