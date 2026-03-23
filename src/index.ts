#!/usr/bin/env node

// src/index.ts
import { cac } from "cac";
import chalk from "chalk";
import clipboard from "clipboardy";

import { generatePassword } from "./services/passwordService";
import { generateDicewarePassword } from "./services/dicewareService";

const cli = cac("pwgen");

// Type - Characters
cli
  .command("generate", "Generate password")
  .alias("gen")
  .alias("g")
  .option("-L, --length <length>", "Password length", { default: 10 })
  .option("-n, --numbers", "Include numbers", { default: true })
  .option("-l, --lowercase", "Include lowercase", { default: true })
  .option("-u, --uppercase", "Include uppercase", { default: true })
  .option("-s, --special", "Include symbols", { default: true })
  .option("-c, --copy", "Copy to clipboard")
  .option("--stats", "Show entropy and strength")
  .example("pwgen generate")
  .example("pwgen gen -L 14 --stats")
  .example("pwgen gen -L 20 --no-s --no-u")
  .example("pwgen g -L 13 -c")
  .action((options) => {
    try {
      const { lowercase, uppercase, special, numbers } = options;

      const enabledCharsets = [lowercase, uppercase, special, numbers];

      if (!enabledCharsets.some(Boolean)) {
        console.error(chalk.red.bold("❌ Error: No character sets selected.\n"));
        console.log(chalk.dim(`
Enable at least one:
  -l, --lowercase
  -u, --uppercase
  -s, --special
  -n, --numbers
`));
        process.exit(1);
      }

      const { password, entropy, strength } = generatePassword({
        length: Number(options.length),
        lowercase,
        uppercase,
        numbers,
        special,
      });

      console.log(chalk.cyan(password));

      if (options.stats) {
        console.log(`Entropy: ${entropy.toFixed(2)} bits`);
        console.log(`Strength: ${colorStrength(strength)}`);
      }

      if (options.copy) {
        try {
          
          clipboard.writeSync(password);
          const copied = clipboard.readSync();

          if (copied === password) {
            console.log(chalk.green("✔ Copied to clipboard"));
          } else {
            console.log(chalk.yellow("⚠ Clipboard copy uncertain"));
          }
        } catch {
          console.log(chalk.yellow("⚠ Failed to copy"));
        }
      }

    } catch (err) {
      console.error(chalk.red("❌ Error:"), (err as Error).message);
      process.exit(1);
    }
  });


// Type - Diceware Wordlist
cli
  .command("diceware", "Generate diceware passphrase")
  .alias("dice")
  .alias("d")
  .option("-w, --words <words>", "Number of words", { default: 5 })
  .option("-s, --separator <sep>", "Word separator", { default: "-" })
  .option("-C, --capitalize", "Capitalize words")
  .option("-c, --copy", "Copy to clipboard")
  .option("--stats", "Show entropy and strength")
  .example("pwgen diceware")
  .example("pwgen diceware -w 6")
  .example('pwgen dice -w 4 -s "_"')
  .example("pwgen d -w 5 -C -c")
  .action((options) => {
    try {
      const { password, entropy, strength } = generateDicewarePassword({
        words: Number(options.words),
        separator: options.separator,
        capitalize: options.capitalize,
      });

      console.log(chalk.cyan(password));

      if (options.stats) {
        console.log(`Entropy: ${entropy.toFixed(2)} bits`);
        console.log(`Strength: ${colorStrength(strength)}`);
      }

      if (options.copy) {
        try {
          
          clipboard.writeSync(password);
          const copied = clipboard.readSync();
          
          if (copied === password) {
            console.log(chalk.green("✔ Copied to clipboard"));
          } else {
            console.log(chalk.yellow("⚠ Clipboard copy uncertain"));
          }
        } catch {
          console.log(chalk.yellow("⚠ Failed to copy"));
        }
      }

    } catch (err) {
      console.error(chalk.red("❌ Error:"), (err as Error).message);
      process.exit(1);
    }
  });
cli.help();
cli.parse();


// Password Strength Check
function colorStrength(strength: string) {
  switch (strength) {
    case "Very Weak":
    case "Weak":
      return chalk.red(strength);
    case "Medium":
      return chalk.yellow(strength);
    case "Strong":
      return chalk.green(strength);
    case "Very Strong":
      return chalk.bold.green(strength);
    default:
      return strength;
  }
}
