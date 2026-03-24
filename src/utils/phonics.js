export const PHONICS = {
  A: { name: "A", sound: "æ",  description: "apple",   phrase: "A says /æ/ as in Apple!" },
  B: { name: "B", sound: "b",  description: "ball",    phrase: "B says /b/ as in Ball!" },
  C: { name: "C", sound: "k",  description: "cat",     phrase: "C says /k/ as in Cat!" },
  D: { name: "D", sound: "d",  description: "dog",     phrase: "D says /d/ as in Dog!" },
  E: { name: "E", sound: "ɛ",  description: "egg",     phrase: "E says /ɛ/ as in Egg!" },
  F: { name: "F", sound: "f",  description: "fish",    phrase: "F says /f/ as in Fish!" },
  G: { name: "G", sound: "g",  description: "goat",    phrase: "G says /g/ as in Goat!" },
  H: { name: "H", sound: "h",  description: "hat",     phrase: "H says /h/ as in Hat!" },
  I: { name: "I", sound: "ɪ",  description: "igloo",   phrase: "I says /ɪ/ as in Igloo!" },
  J: { name: "J", sound: "dʒ", description: "jump",    phrase: "J says /dʒ/ as in Jump!" },
  K: { name: "K", sound: "k",  description: "kite",    phrase: "K says /k/ as in Kite!" },
  L: { name: "L", sound: "l",  description: "lion",    phrase: "L says /l/ as in Lion!" },
  M: { name: "M", sound: "m",  description: "moon",    phrase: "M says /m/ as in Moon!" },
  N: { name: "N", sound: "n",  description: "nose",    phrase: "N says /n/ as in Nose!" },
  O: { name: "O", sound: "ɒ",  description: "octopus", phrase: "O says /ɒ/ as in Octopus!" },
  P: { name: "P", sound: "p",  description: "pen",     phrase: "P says /p/ as in Pen!" },
  Q: { name: "Q", sound: "kw", description: "queen",   phrase: "Q says /kw/ as in Queen!" },
  R: { name: "R", sound: "r",  description: "rainbow", phrase: "R says /r/ as in Rainbow!" },
  S: { name: "S", sound: "s",  description: "sun",     phrase: "S says /s/ as in Sun!" },
  T: { name: "T", sound: "t",  description: "tree",    phrase: "T says /t/ as in Tree!" },
  U: { name: "U", sound: "ʌ",  description: "umbrella",phrase: "U says /ʌ/ as in Umbrella!" },
  V: { name: "V", sound: "v",  description: "van",     phrase: "V says /v/ as in Van!" },
  W: { name: "W", sound: "w",  description: "water",   phrase: "W says /w/ as in Water!" },
  X: { name: "X", sound: "ks", description: "fox",     phrase: "X says /ks/ as in Fox!" },
  Y: { name: "Y", sound: "j",  description: "yellow",  phrase: "Y says /j/ as in Yellow!" },
  Z: { name: "Z", sound: "z",  description: "zebra",   phrase: "Z says /z/ as in Zebra!" },
};

const PHONICS_SPOKEN = {
  A: "ah", B: "buh", C: "kuh", D: "duh", E: "eh", F: "fuh", G: "guh",
  H: "huh", I: "ih", J: "juh", K: "kuh", L: "luh", M: "muh", N: "nuh",
  O: "aw", P: "puh", Q: "kwuh", R: "ruh", S: "sss", T: "tuh", U: "uh",
  V: "vuh", W: "wuh", X: "ksss", Y: "yuh", Z: "zzz",
};

export function speakLetter(letter) {
  window.speechSynthesis.cancel();
  const spoken = PHONICS_SPOKEN[letter];
  if (!spoken) return;
  const u = new SpeechSynthesisUtterance(spoken);
  u.lang = "en-US"; u.rate = 0.7; u.pitch = 1.1;
  window.speechSynthesis.speak(u);
}

export function speakResult(grade, letter) {
  window.speechSynthesis.cancel();
  const phonics = PHONICS[letter];
  let praise;
  if (grade === "A+")         praise = `Excellent! You wrote the letter ${letter} perfectly! ${phonics.phrase}`;
  else if (grade === "B")     praise = `Good job! Keep practicing the letter ${letter}. ${phonics.phrase}`;
  else if (grade === "C")     praise = `Nice try! Let's practice ${letter} again. ${phonics.phrase}`;
  else                        praise = `Don't give up! Try writing the letter ${letter} one more time!`;
  const u = new SpeechSynthesisUtterance(praise);
  u.lang = "en-US"; u.rate = 0.82; u.pitch = 1.1;
  window.speechSynthesis.speak(u);
}
