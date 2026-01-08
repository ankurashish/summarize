// Format AI text into readable HTML
function formatAIText(text) {
  if (!text) return "";

  // Normalize newlines
  text = text.replace(/\r\n/g, "\n");

  // Bold **text**
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert markdown bullets (* or -) to bullet symbol
  text = text.replace(/^\s*[\*\-]\s+/gm, "• ");

  // Ensure bullets start on new lines
  text = text.replace(/• /g, "<br>• ");

  // Paragraph spacing
  text = text.replace(/\n{2,}/g, "<br><br>");

  // Remove leading break
  text = text.replace(/^<br>/, "");

  return text;
}

document.getElementById("summarize").addEventListener("click", () => {
  const result = document.getElementById("result");
  const summaryType = document.getElementById("summaryType").value;

  result.textContent = "Summarizing...";

  chrome.storage.sync.get(["geminiApiKey"], ({ geminiApiKey }) => {
    if (!geminiApiKey) {
      result.textContent = "API key not set. Open settings.";
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(tab.id, { type: "getArticleText" }, (res) => {
        if (!res || !res.text) {
          result.textContent = "Could not extract article text.";
          return;
        }

        chrome.runtime.sendMessage(
          {
            type: "SUMMARIZE",
            apiKey: geminiApiKey,
            text: res.text,
            summaryType,
          },
          (response) => {
            if (!response) {
              result.textContent = "No response.";
              return;
            }

            if (response.error) {
              result.textContent = response.error;
            } else {
              result.innerHTML = formatAIText(response.summary);
            }
          }
        );
      });
    });
  });
});

// Copy button
document.getElementById("copy-btn").addEventListener("click", () => {
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text);
});
