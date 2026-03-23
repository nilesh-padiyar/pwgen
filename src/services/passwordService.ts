// src/services/passwordService.ts
import { CHARSET_MAP } from "../utils/charset";
import { getRandomInt } from "../utils/random";
import { validateLength, validatePools } from "../utils/validator";
import { calculateEntropy } from "../utils/entropy";
import { getStrength } from "../utils/strength";

type PasswordOptions = {
  length: number;
  numbers?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  special?: boolean;
};

export function generatePassword(options: PasswordOptions) {
  const {
    length,
    numbers = true,
    lowercase = true,
    uppercase = true,
    special = true,
  } = options;

  validateLength(length, 8, 256);

  let pool = "";
  const enabledPools: string[] = [];

  if (numbers) {
    pool += CHARSET_MAP.numbers;
    enabledPools.push(CHARSET_MAP.numbers);
  }

  if (lowercase) {
    pool += CHARSET_MAP.lowercase;
    enabledPools.push(CHARSET_MAP.lowercase);
  }

  if (uppercase) {
    pool += CHARSET_MAP.uppercase;
    enabledPools.push(CHARSET_MAP.uppercase);
  }

  if (special) {
    pool += CHARSET_MAP.special;
    enabledPools.push(CHARSET_MAP.special);
  }

  validatePools(enabledPools, length);

  const result: string[] = [];

  for (const charset of enabledPools) {
    result.push(charset[getRandomInt(charset.length)]);
  }

  for (let i = result.length; i < length; i++) {
    result.push(pool[getRandomInt(pool.length)]);
  }

  for (let i = result.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  const password = result.join("");

  const entropy = calculateEntropy(length, pool.length);
  const strength = getStrength(entropy);

  return { password, entropy, strength };
}
