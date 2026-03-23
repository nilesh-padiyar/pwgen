// src/utils/strength.ts
export function getStrength(entropy: number): string {
  if (entropy < 40) return "Very Weak";
  if (entropy < 60) return "Weak";
  if (entropy < 80) return "Medium";
  if (entropy < 100) return "Strong";
  return "Very Strong";
}
