import { motion, AnimatePresence } from "framer-motion";
import CapybaraSVG from "./CapybaraSVG.jsx";
import { PHONICS } from "../../utils/phonics.js";

const GRADE_CONFIG = {
  "A+":              { label: "A+",       color: "#FF7043", shadow: "#FFE0B2", message: "寫得太漂亮了！水豚君為你歡呼！🍊", emoji: ["🍊","⭐","✨","🎉","🌸","🌟"] },
  "B":               { label: "B",        color: "#43A047", shadow: "#C8E6C9", message: "寫得不錯喔！再練習一次會更好！🌿",  emoji: ["🌿","👏","✨","🌱","💚","⭐"] },
  "C":               { label: "C",        color: "#FB8C00", shadow: "#FFE0B2", message: "繼續加油！水豚君相信你可以的！💪",  emoji: ["💪","🌿","🍊","😊","✏️","💫"] },
  "再試一次！":       { label: "再試\n一次",color: "#E53935", shadow: "#FFCDD2", message: "沒關係！擦掉重寫，你一定可以的！✏️",emoji: ["✏️","💪","🌿","😊","🍀","💫"] },
  "😶 沒有寫字喔！": { label: "?",        color: "#9E9E9E", shadow: "#F5F5F5", message: "先動筆寫字吧！水豚君在等你！✏️",    emoji: ["✏️","📝","🖊️","💭","🌿","😊"] },
};

export default function CelebrationOverlay({ show, grade, score, letter, onDismiss }) {
  const config = GRADE_CONFIG[grade] || GRADE_CONFIG["再試一次！"];
  const phonics = PHONICS[letter] || {};

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", damping: 18, stiffness: 200 }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 rounded-[2rem] cursor-pointer"
          onClick={onDismiss}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", damping: 10 }}
            className="text-7xl sm:text-8xl font-black font-nunito leading-none whitespace-pre-line text-center"
            style={{ color: config.color, textShadow: `3px 3px 0px ${config.shadow}` }}>
            {config.label}
          </motion.div>

          {score !== undefined && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }} className="mt-3 px-8 w-full max-w-xs">
              <div className="flex justify-between text-xs font-nunito font-bold mb-1 text-muted-foreground">
                <span>相似度</span><span>{score}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className="h-3 rounded-full" style={{ backgroundColor: config.color }} />
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }} className="flex flex-col items-center gap-1 mt-3">
            <CapybaraSVG className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
            <p className="text-base sm:text-lg font-bold font-nunito text-primary text-center px-4">{config.message}</p>
            <p className="text-xs sm:text-sm text-muted-foreground font-nunito mt-1">
              <span className="font-bold text-primary">{letter}{letter?.toLowerCase()}</span>
              {phonics.description ? ` — ${phonics.description}` : ""}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">（點擊任意處關閉）</p>
          </motion.div>

          <motion.div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {[...Array(12)].map((_, i) => (
              <motion.span key={i} className="absolute text-2xl"
                initial={{ x: `${10 + Math.random() * 80}%`, y: "110%", opacity: 1 }}
                animate={{ y: "-10%", opacity: [1, 1, 0], rotate: Math.random() * 360 }}
                transition={{ duration: 2 + Math.random(), delay: Math.random() * 0.6, ease: "easeOut" }}>
                {config.emoji[i % config.emoji.length]}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
