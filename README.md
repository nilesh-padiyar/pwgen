# pwgen

**pwgen** is a CLI tool to generate cryptographically secure passwords with customizable character sets.
It can optionally copy the generated password to your clipboard. Built with TypeScript and Node.js.

---

# Features

- Generate secure passwords of any length
- Include/exclude numbers, lowercase, uppercase, and special characters
- Copy password directly to clipboard (--copy / -c)
- Fully CLI-based, lightweight, fast

---

# Prerequisites

Before installing ```pwgen```, make sure you have:

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- npm (comes with Node.js)


Check versions in terminal:
```bash
node -v #Node.js version check
npm -v  #npm version check
```

---

# Installation

```bash
npm install -g @nilesh-padiyar/pwgen
```

After installing, you can run:
```bash
pwgen generate --help
```

---

# Usage Examples

```bash
# Generate a 16-character password with letters and numbers
pwgen generate -L 16 -n -l -u

# Generate a 20-character password and copy to clipboard
pwgen generate -L 20 -c

# Disable uppercase and symbols
pwgen generate -L 12 --no-u --no-s
```

---

# Development Setup

If you want to work on project:

```bash
git clone https://github.com/nilesh-padiyar/pwgen.git
cd pwgen
npm install
npm run build
```

Run locally:

```bash
node dist/index.js
```

---

# Using Locally (Optional)

```bash
npm link
pwgen generate
```

---

# CLI Configuration

Make sure your ```package.json``` includes:

```json
"bin": {
  "pwgen": "dist/index.js"
}
```

And your entry file starts with shebang:

```ts
#!/usr/bin/env node
```

---

# Updating

```bash
npm update -g @nilesh-padiyar/pwgen
```

---

# Tech Stack

- TypeScript – for type safety and modern JavaScript features
- Node.js – runtime environment for CLI execution
- CAC – lightweight CLI framework for commands and options
- clipboardy – cross-platform clipboard integration
- tsc (TypeScript Compiler) – compiles TypeScript into JavaScript
- npm scripts – for building, running, and testing locally
- Git – version control for source code management

---

# Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3.  Make your changes
4. Submit a pull request

Please keep commits clean and meaningful.

---

# License

**MIT** — free to use, modify and distribute

---

# Author

[**Nilesh Padiyar**](https://github.com/nilesh-padiyar/)

---
