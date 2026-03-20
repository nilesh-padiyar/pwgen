#!/usr/bin/env node

import { cac } from "cac";
import clipboard from "clipboardy";
import { generatePassword } from "./services/passwordService";

const cli = cac("pwgen");

cli
  .command("generate", "Generate password")
  .option("-L, --length <length>", "Password length", { default: 16 })
  .option("-n, --numbers", "Include numbers", { default: true })
  .option("-l, --lowercase", "Include lowercase", { default: true })
  .option("-u, --uppercase", "Include uppercase", { default: true })
  .option("-s, --special", "Include symbols", { default: true })
  .option("-c, --copy", "Copy to clipboard")
  .example("pwgen generate")
  .example("pwgen generate -L 20 --no-s --no-u")
  .example("pwgen generate -L 13 -c")
  .action((options) => {
    try {
      const { lowercase, uppercase, special, numbers } = options;
  
      const enabledCharsets = [lowercase, uppercase, special, numbers];
  
      if (!enabledCharsets.some(Boolean)) {
        console.error(`
  Error: No character sets selected.
  
  Enable at least one:
    -l, --lowercase
    -u, --uppercase
    -s, --special
    -n, --numbers
  `);
        process.exit(1);
      }
  
      const password = generatePassword({
        length: Number(options.length),
        lowercase,
        uppercase,
        numbers,
        special,
      });
  
      if (options.copy) {
        console.log(password);
  
        try {
          clipboard.writeSync(password);
          console.log("✔ Copied to clipboard");
        } catch {
          console.log("⚠ Failed to copy (password shown above)");
        }
      } else {
        console.log(password);
      }
  
    } catch (err) {
      console.error("Error:", (err as Error).message);
      process.exit(1);
    }
  });
cli.help();
cli.parse();
