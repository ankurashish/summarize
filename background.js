// Open options page on install if API key missing
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["geminiApiKey"], (res) => {
    if (!res.geminiApiKey) {
      chrome.tabs.create({ url: "options.html" });
    }
  });
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SUMMARIZE") {
    (async () => {
      try {
        const summary = await summarizeWithGroq(msg);
        sendResponse({ summary });
      } catch (e) {
        sendResponse({ error: e.message });
      }
    })();
    return true; // REQUIRED
  }
});

// Groq API call
async function summarizeWithGroq({ apiKey, text, summaryType }) {
  const truncated = text.slice(0, 4000);

  const prompts = {
    short: `Summarize briefly in 2-3 sentences:\n\n${truncated}`,
    detailed: `Provide a detailed summary:\n\n${truncated}`,
    bullet: `Summarize in bullet points:\n\n${truncated}`,
  };

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompts[summaryType],
        },
      ],
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No summary generated.";
}
