import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eraser, Send, Volume2 } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function LetterSelector({ selectedLetter, onLetterChange, onReset, onScore, onSpeak }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Select value={selectedLetter} onValueChange={onLetterChange}>
        <SelectTrigger className="w-48 rounded-full bg-white/80 border-2 border-accent/40 font-nunito font-bold text-base shadow-sm">
          <SelectValue placeholder="選擇字母" />
        </SelectTrigger>
        <SelectContent className="font-nunito max-h-60">
          {ALPHABET.map((letter) => (
            <SelectItem key={letter} value={letter} className="font-bold text-base">
              練習字母 {letter}{letter.toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={onSpeak}
        className="rounded-full bg-secondary/80 border-2 border-secondary font-nunito font-bold gap-2 px-5 shadow-sm hover:bg-secondary">
        <Volume2 className="w-4 h-4" />聽發音
      </Button>

      <Button variant="outline" onClick={onReset}
        className="rounded-full bg-muted/80 border-2 border-border font-nunito font-bold gap-2 px-5 shadow-sm hover:bg-muted">
        <Eraser className="w-4 h-4" />擦乾淨
      </Button>

      <Button onClick={onScore}
        className="rounded-full bg-accent text-accent-foreground font-nunito font-extrabold gap-2 px-6 shadow-md hover:bg-accent/90 border-none">
        <Send className="w-4 h-4" />交卷！
      </Button>
    </div>
  );
}
