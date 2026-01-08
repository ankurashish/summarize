# 🧠 AI Summarize – Chrome Extension

A Chrome extension that instantly summarizes any article or webpage using AI.  
Choose between **Short**, **Detailed**, or **Bullet** summaries with a clean, readable popup UI.

---

## ✨ Features

- 📄 Summarize any webpage content
- 🎯 Multiple summary modes:
  - **Short** – quick overview
  - **Detailed** – in-depth explanation
  - **Bullets** – key points
- 🧠 Powered by **Groq LLMs**
- 🎨 Clean, readable popup UI
- 📋 One-click copy to clipboard
- 🔐 Users use **their own API key** (secure)

---

## 🚀 Installation (Developer Mode)

This extension is not yet published on the Chrome Web Store.  
Install it manually using Developer Mode.

### Steps

1. Clone or download this repository:
   ```bash
   git clone https://github.com/ankurashish/summarize.git
   ```

2. Open Chrome and go to:
   ```
   chrome://extensions
   ```

3. Enable **Developer mode** (top-right corner)

4. Click **Load unpacked**

5. Select the project folder

✅ The extension will now appear in your Chrome toolbar.

---

## 🔑 API Key Setup (Required)

This extension uses the **Groq API**.

### Get a free API key:
👉 https://console.groq.com/keys

### Add your API key:
1. Click the extension icon
2. Open **Options**
3. Paste your Groq API key
4. Click **Save**

⚠️ Your API key is stored locally and is **never shared**.

---

## 🧪 How to Use

1. Open any article or webpage
2. Click the **AI Summarize** extension
3. Choose a summary type:
   - Short
   - Detailed
   - Bullets
4. Click **Summarize**
5. Use the **Copy** button to copy the summary

---

## ⚙️ Tech Stack

- Chrome Extensions (Manifest v3)
- JavaScript
- Groq API
- Tailwind CSS
- HTML & CSS

---

## 📌 Rate Limits (TPM)

Groq enforces a **tokens-per-minute (TPM)** limit.

- If the limit is exceeded, requests may temporarily fail
- Wait ~60 seconds and try again

This is expected behavior.

---

## 🔐 Security Notes

- ❌ No API keys are hardcoded
- ✔ Each user provides their own key
- ✔ Safe to share and use

---

## 🛠️ Development

After making changes to the code:

1. Save your files
2. Go to `chrome://extensions`
3. Click **Reload** on the extension

---

## 📦 Project Structure

```
.
├── manifest.json
├── popup.html
├── popup.js
├── background.js
├── content.js
├── options.html
├── options.js
├── input.css
├── output.css
├── tailwind.config.cjs
└── README.md
```

---

## 🌱 Future Improvements

- Markdown rendering for summaries
- Backend proxy (no API key required)
- Chrome Web Store release
- Usage limits and plans
- Better bullet formatting

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome!  
Feel free to open an issue or submit a pull request.

---

## 📄 License

MIT License
