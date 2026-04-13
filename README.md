# pwgen 🔐

[**pwgen**](https://www.npmjs.com/package/@nilesh-padiyar/pwgen) is a fast, secure CLI tool for generating passwords and passphrases directly from your terminal.

Built with **Node.js + TypeScript**, it uses cryptographically secure randomness and supports both traditional **character-based** passwords and modern **Diceware passphrases**.

---

## ✨ Features

### 🔐 Password Generation

* Generate secure passwords of any length
* Fully customizable character sets:

  * Numbers
  * Lowercase
  * Uppercase
  * Symbols

### 🎲 Diceware Passphrases *(v1.1.0)*

* Generate human-readable, secure passphrases
* Custom word count and separators
* Optional capitalization

### 🧠 Entropy & Strength Analysis *(v1.1.0)*

* Calculate password entropy (in bits)
* Classify strength: Weak → Very Strong
* Optional `--stats` flag to display analysis

### 📋 Clipboard Support

* Copy generated passwords directly to clipboard

Clipboard support works reliably on **Windows** and **macOS**.

> ⚠️ On some **Linux** systems (especially Wayland), the CLI may appear to hang after copying.
> The password is usually copied successfully. Press `Ctrl + C` to exit if needed.

### ⚡ CLI First

* Lightweight and fast
* Simple, developer-friendly commands

---

## 📦 Installation

```bash
npm install -g @nilesh-padiyar/pwgen
```


**NOTE:-**

Before installing, make sure you have:

1. [**Node.js**](https://nodejs.org) (version 14 or higher recommended)
2. **npm** (comes with Node.js)

Check versions in terminal: 

```bash
node -v #Node.js version check
npm -v  #npm version check
```

---

## 🚀 Usage

### 🔐 Generate Passwords (Character-Based)

```bash
# Default (10 chars)
pwgen generate

# Custom length
pwgen gen -L 20

# Show entropy & strength
pwgen generate --stats

# Copy to clipboard
pwgen g -c

# Disable specific character sets
pwgen generate -L 12 --no-u --no-s
```

**Example Output:**

```bash
FEP39S$vA*
Entropy: 63.58 bits
Strength: Medium
```

---

### 🎲 Generate Diceware Passphrases

```bash
# Default (5 words)
pwgen diceware

# Custom word count
pwgen dice -w 4

# Show entropy & strength
pwgen diceware --stats

# Custom separator
pwgen d -w 4 -s "_"

# Capitalized words
pwgen dice -w 5 -C

# Copy to clipboard
pwgen diceware -c
```

**Example output:**

```bash
orbit-ember-shadow-tiger-forest
Entropy: 64.62 bits
Strength: Medium
```

---

## 🧠 Why pwgen?

* Uses **Node.js crypto module** for secure randomness
* Designed for developers who prefer terminal workflows
* Provides **transparent security metrics (entropy + strength)**
* Supports both:

  * 🔑 Strong random passwords
  * 🧠 Memorable passphrases

---

## ⚙️ CLI Options

### `generate`

* `-L, --length <length>` → Password length (default: 10)
* `-n, --numbers` → Include numbers
* `-l, --lowercase` → Include lowercase
* `-u, --uppercase` → Include uppercase
* `-s, --special` → Include symbols
* `-c, --copy` → Copy to clipboard
* `--stats` → Show entropy and strength

---

### `diceware`

* `-w, --words <number>` → Number of words (default: 5)
* `-s, --separator <sep>` → Separator (default: "-")
* `-C, --capitalize` → Capitalize words
* `-c, --copy` → Copy to clipboard
* `--stats` → Show entropy and strength

---

## 🛠 Development

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

## 🔗 Use Locally (Optional)

```bash
npm link
pwgen generate
```

**CLI Configuration:** 

Make sure your ```package.json``` includes:

```json
"bin": {
    "pwgen": "dist/index.js"
}
```

And you entry file (index.js) starts with shebang:

```ts
#!/usr/bin/env node
```

---

## 🔄 Update

```bash
npm update -g @nilesh-padiyar/pwgen
```

---

## 🧱 Tech Stack

* TypeScript
* Node.js
* CAC (CLI framework)
* clipboardy
* chalk
* Node.js crypto module

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

**MIT** — free to use, modify, and distribute

---

## 👨‍💻 Author

[**Nilesh Padiyar**](https://github.com/nilesh-padiyar)

---
