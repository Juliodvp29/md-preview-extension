# MD Preview — GitHub-style Markdown Previewer

> Instantly preview your Markdown files with GitHub styling, side by side with your editor.

---

## ✨ Features

- **Live preview** — the panel updates in real time as you type, no need to save
- **GitHub Dark theme** — familiar styling with dark background, styled headings, tables, blockquotes and more
- **Syntax highlighting** — code blocks are highlighted by language using highlight.js (supports TypeScript, JavaScript, Python, SQL, Bash, and [180+ more](https://highlightjs.org/))
- **Side-by-side layout** — preview opens next to your file, not replacing it
- **Inline code styling** — inline `code` is styled distinctly from block code

---

## 🚀 How to use

### Option 1 — Command Palette

1. Open any `.md` file
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Search for **"Abrir Preview Markdown"** and press Enter

### Option 2 — Keyboard shortcut

With a `.md` file open, press:

```
Ctrl+Shift+M
```

The preview panel will open to the right automatically.

---

## 📸 Preview

![ScreenToGif](/images/Animation.gif)

---

## 🎨 Styling

The preview renders with a GitHub Dark–inspired theme:

| Element     | Style                               |
| ----------- | ----------------------------------- |
| Background  | `#0d1117` (GitHub dark)             |
| Headings    | Light with bottom border            |
| Code blocks | Dark panel with syntax highlighting |
| Inline code | Red-tinted monospace                |
| Blockquotes | Left border, muted text             |
| Tables      | Bordered with alternating rows      |
| Links       | GitHub blue `#58a6ff`               |

---

## 🔧 Requirements

- VS Code `1.60.0` or higher
- No additional setup needed

---

## 📦 Extension settings

This extension does not add any VS Code settings at the moment.

---

## 🐛 Known issues

- Images with relative paths may not render correctly if the file is not in a workspace folder
- The preview does not scroll to match the editor cursor position

---

## 📋 Release notes

### 0.1.0

- Initial release
- Live Markdown preview with GitHub Dark styling
- Syntax highlighting via highlight.js
- Real-time update on every keystroke

---

## 🛠️ Built with

- [marked](https://marked.js.org/) — Markdown parser
- [highlight.js](https://highlightjs.org/) — Syntax highlighting
- [VS Code Extension API](https://code.visualstudio.com/api)

---

## 🤝 Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/Juliodvp29/md-preview-extension).

---

_Made with ❤️ as a first VS Code extension._
