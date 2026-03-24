const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function LetterProgress({ currentLetter }) {
  const currentIdx = ALPHABET.indexOf(currentLetter);
  return (
    <div className="flex flex-wrap justify-center gap-1 px-2 max-w-lg mx-auto">
      {ALPHABET.map((letter, i) => (
        <div key={letter}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold font-nunito transition-all duration-300 ${
            i < currentIdx   ? "bg-accent/80 text-white shadow-sm" :
            i === currentIdx ? "bg-primary text-primary-foreground shadow-md scale-110" :
                               "bg-muted/60 text-muted-foreground"
          }`}>
          {letter}
        </div>
      ))}
    </div>
  );
}
