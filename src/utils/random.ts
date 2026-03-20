import { randomInt } from "node:crypto";

export function getRandomInt(max: number) {
  return randomInt(0, max);
}
