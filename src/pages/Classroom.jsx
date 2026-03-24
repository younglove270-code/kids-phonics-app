import { useState, useCallback, useRef } from "react";
import LetterSelector from "../components/classroom/LetterSelector.jsx";
import LetterCanvas from "../components/classroom/LetterCanvas.jsx";
import CelebrationOverlay from "../components/classroom/CelebrationOverlay.jsx";
import LetterProgress from "../components/classroom/LetterProgress.jsx";
import { gradeDrawing } from "../utils/gradeCanvas.js";
import { speakLetter, speakResult, PHONICS } from "../utils/phonics.js";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BG_IMAGE = "https://media.base44.com/images/public/69c29b6ba4f1963e90202b13/b01444a69_generated_image.png";

export default function Classroom() {
  const [letter, setLetter] = useState("A");
  const [resetKey, setResetKey] = useState(0);
  const [celebration, setCelebration] = useState(null);
  const canvasRef = useRef(null);
  const autoAdvanceTimer = useRef(null);

  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1);
    setCelebration(null);
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
  }, []);

  const handleSpeak = useCallback(() => { speakLetter(letter); }, [letter]);

  const handleScore = useCallback(() => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;
    const result = gradeDrawing(canvas, letter);
    setCelebration({ grade: result.grade, score: result.score });
    speakResult(result.grade, letter);
    if (result.advance) {
      autoAdvanceTimer.current = setTimeout(() => {
        const idx = ALPHABET.indexOf(letter);
        if (idx < 25) setLetter(ALPHABET[idx + 1]);
        setResetKey((k) => k + 1);
        setCelebration(null);
      }, 1000);
    }
  }, [letter]);

  const handleDismiss = useCallback(() => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setCelebration(null);
  }, []);

  const handleLetterChange = useCallback((val) => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setLetter(val); setCelebration(null); setResetKey((k) => k + 1);
  }, []);

  const phonics = PHONICS[letter];

  return (
    <div className="min-h-screen font-nunito relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(248,250,240,0.85), rgba(248,250,240,0.7)), url(${BG_IMAGE})`,
        backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed",
      }}>
      <div className="pt-6 pb-2 text-center">
        <div className="text-4xl sm:text-5xl mb-1 drop-shadow-sm select-none">🎒 🌿 🌲 🍎</div>
        <h1 className="text-2xl sm:text-3xl font-black text-primary tracking-wide">✨ 水豚君森林教室 Aa-Zz ✨</h1>
        <p className="text-sm text-muted-foreground mt-1">跟著水豚君一起練習寫英文字母吧！</p>
      </div>

      <div className="mt-3 mb-4"><LetterProgress currentLetter={letter} /></div>

      <div className="mb-4 px-4">
        <LetterSelector selectedLetter={letter} onLetterChange={handleLetterChange}
          onReset={handleReset} onScore={handleScore} onSpeak={handleSpeak} />
      </div>

      <div className="px-4 pb-4 relative">
        <div className="relative max-w-lg mx-auto">
          <LetterCanvas ref__={canvasRef} letter={letter} resetKey={resetKey} />
          <CelebrationOverlay show={!!celebration} grade={celebration?.grade}
            score={celebration?.score} letter={letter} onDismiss={handleDismiss} />
        </div>
        <div className="text-center mt-4">
          <div className="inline-flex flex-col items-center bg-white/80 rounded-2xl px-6 py-3 shadow-sm border border-border gap-1">
            <div>
              <span className="text-4xl sm:text-5xl font-black text-primary">{letter}</span>
              <span className="text-4xl sm:text-5xl font-black text-accent ml-2">{letter.toLowerCase()}</span>
            </div>
            {phonics && (
              <div className="text-xs sm:text-sm text-muted-foreground font-nunito font-semibold">
                /{phonics.sound}/ &nbsp;·&nbsp; <span className="capitalize">{phonics.description}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
