// src/services/dicewareService.ts
import WORDLIST from "../wordlists/diceware.json";
import { getRandomInt } from "../utils/random";
import { getStrength } from "../utils/strength";

export function generateDicewarePassword({
  words,
  separator = "-",
  capitalize = false,
}: {
  words: number;
  separator?: string;
  capitalize?: boolean;
}) {
  if (words < 3 || words > 30) {
    throw new Error("Words must be between 3 and 30");
  }

  const result: string[] = [];

  for (let i = 0; i < words; i++) {
    let word = WORDLIST[getRandomInt(WORDLIST.length)];

    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    result.push(word);
  }

  const password = result.join(separator);

  const entropy = Math.log2(Math.pow(WORDLIST.length, words));
  const strength = getStrength(entropy);

  return { password, entropy, strength };
}
