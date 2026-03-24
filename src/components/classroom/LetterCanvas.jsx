import { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import CapybaraSVG from "./CapybaraSVG.jsx";

const LetterCanvas = forwardRef(function LetterCanvas({ letter, resetKey }, ref) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const hasDrawnRef = useRef(false);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    hasDrawn: () => hasDrawnRef.current,
  }));

  const getPos = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }, []);

  const drawTemplate = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    hasDrawnRef.current = false;

    ctx.font = "bold 220px Arial";
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter + letter.toLowerCase(), cvs.width / 2, cvs.height / 2);

    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#E6D5C3";
    [0.24, 0.38, 0.52, 0.66].forEach((pct) => {
      const y = cvs.height * pct;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cvs.width, y); ctx.stroke();
    });
    ctx.setLineDash([]);
  }, [letter]);

  useEffect(() => { drawTemplate(); }, [letter, resetKey, drawTemplate]);

  const startDraw = useCallback((e) => {
    e.preventDefault();
    drawingRef.current = true; hasDrawnRef.current = true;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    const p = getPos(e); ctx.moveTo(p.x, p.y);
  }, [getPos]);

  const moveDraw = useCallback((e) => {
    if (!drawingRef.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const p = getPos(e);
    ctx.lineWidth = 14; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.strokeStyle = "#4FC3F7";
    ctx.lineTo(p.x, p.y); ctx.stroke();
  }, [getPos]);

  const stopDraw = useCallback(() => { drawingRef.current = false; }, []);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    cvs.addEventListener("mousedown", startDraw);
    cvs.addEventListener("mousemove", moveDraw);
    window.addEventListener("mouseup", stopDraw);
    cvs.addEventListener("touchstart", startDraw, { passive: false });
    cvs.addEventListener("touchmove", moveDraw, { passive: false });
    cvs.addEventListener("touchend", stopDraw);
    return () => {
      cvs.removeEventListener("mousedown", startDraw);
      cvs.removeEventListener("mousemove", moveDraw);
      window.removeEventListener("mouseup", stopDraw);
      cvs.removeEventListener("touchstart", startDraw);
      cvs.removeEventListener("touchmove", moveDraw);
      cvs.removeEventListener("touchend", stopDraw);
    };
  }, [startDraw, moveDraw, stopDraw]);

  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto bg-white border-[10px] border-primary/30 rounded-[2rem] shadow-xl overflow-hidden touch-none">
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none opacity-90">
        <CapybaraSVG className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-md" />
      </div>
      <canvas ref__={canvasRef} width={500} height={380}
        className="w-full h-full block rounded-[1.5rem] relative z-20 cursor-crosshair"
        style={{ background: "transparent" }} />
    </div>
  );
});

export default LetterCanvas;
