// src/utils/entropy.ts
export function calculateEntropy(length: number, poolSize: number): number {
  return length * Math.log2(poolSize);
}
