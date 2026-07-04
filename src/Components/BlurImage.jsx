import { useState, useCallback } from "react"

export default function BlurImage({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = useCallback(() => setLoaded(true), [])

  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%" }}>
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onLoad={handleLoad}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: loaded ? "blur(0)" : "blur(24px)",
          transform: loaded ? "scale(1)" : "scale(1.08)",
          transition: "filter 0.6s ease-out, transform 0.6s ease-out",
          opacity: loaded ? 1 : 0.95,
        }}
      />
    </div>
  )
}
