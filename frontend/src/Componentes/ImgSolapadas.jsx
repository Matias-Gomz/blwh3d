import React, { useState } from "react";

import fnaf1 from "../assets/fnaf poster 1.png";
import fnaf2 from "../assets/fnaf poster 2.png";
import fnaf3 from "../assets/fnaf poster 3.png";
import fnaf4 from "../assets/fnaf poster 4.png";

export default function ImgSolapadas() {
  const images = [fnaf1, fnaf2, fnaf3, fnaf4];
  const [hovered, setHovered] = useState(null);

  return (
    <div className="relative w-full h-150">

      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`poster-${i}`}
          className={`
            absolute w-full object-contain transition-opacity duration-300
            ${
              hovered === null
                ? "opacity-100"            // nadie seleccionado → todas normales
                : hovered === i
                ? "opacity-100"            // imagen seleccionada → full
                : "opacity-70"             // las demás → opacas
            }
          `}
        />
      ))}

      <div className="absolute inset-0 grid grid-cols-7 translate-x-160 translate-y-25">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="cursor-pointer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            
            
          />
        ))}
      </div>
    </div>
  );
}
