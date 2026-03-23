// src/utils/validator.ts
export function validateLength(length: number, min: number, max: number) {
  if (length < min || length > max) {
    throw new Error(`Password length must be between ${min} and ${max}`);
  }
}

export function validatePools(enabledPools: string[], length: number) {
  if (enabledPools.length === 0) {
    throw new Error("At least one character type must be enabled.");
  }

  if (length < enabledPools.length) {
    throw new Error("Password length is too short for selected character sets.");
  }
}
