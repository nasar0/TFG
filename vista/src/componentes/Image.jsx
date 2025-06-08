import { useState, useRef, useEffect } from "react";

const Image = ({ activeImage, closeModal }) => {
   const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // Para evitar scroll del body
  useEffect(() => {
    document.body.style.overflow = activeImage ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [activeImage]);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(1, prev + delta), 5));
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = getDistance(e.touches[0], e.touches[1]);
      containerRef.current.initialPinchDistance = dist;
      containerRef.current.initialScale = scale;
    } else if (e.touches.length === 1) {
      setDragging(true);
      setStartPos({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dist = getDistance(e.touches[0], e.touches[1]);
      const initialDist = containerRef.current.initialPinchDistance;
      const newScale = containerRef.current.initialScale * (dist / initialDist);
      setScale(Math.min(Math.max(1, newScale), 5));
    } else if (e.touches.length === 1 && dragging) {
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  const getDistance = (touch1, touch2) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  if (!activeImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        ref={containerRef}
        className="max-w-[90vw] max-h-[90vh] overflow-hidden cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          ref={imgRef}
          src={`/img/prods/${activeImage}`}
          alt="Zoomed"
          className="pointer-events-none select-none"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transformOrigin: "center",
            transition: dragging ? "none" : "transform 0.2s ease",
          }}
        />
      </div>
    </div>
  );
}

export default Image