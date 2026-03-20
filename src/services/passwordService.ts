import { CHARSET_MAP } from "../utils/charset";
import { getRandomInt } from "../utils/random";
import { validateLength, validatePools } from "../utils/validator";

type PasswordOptions = {
  length: number;
  numbers?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  special?: boolean;
};

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 256;

export function generatePassword(options: PasswordOptions): string {
  const {
    length,
    numbers = true,
    lowercase = true,
    uppercase = true,
    special = true,
  } = options;

  // ✅ validate length
  validateLength(length, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH);

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

  // ✅ validate pools
  validatePools(enabledPools, length);

  const result: string[] = [];

  // ✅ ensure at least one char from each enabled set
  for (const charset of enabledPools) {
    const randIndex = getRandomInt(charset.length);
    result.push(charset[randIndex]);
  }

  // ✅ fill remaining characters
  for (let i = result.length; i < length; i++) {
    const randIndex = getRandomInt(pool.length);
    result.push(pool[randIndex]);
  }

  // ✅ shuffle (Fisher-Yates)
  for (let i = result.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join("");
}
