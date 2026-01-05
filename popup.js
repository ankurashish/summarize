document.getElementById("summarize").addEventListener("click", () => {
  const result = document.getElementById("result");
  const summaryType = document.getElementById("summaryType").value;
  result.innerHTML =
    '<div class="w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>';
  //getting api key
  chrome.storage.local.get(["geminiApiKey"], ({ geminiApiKey }) => {
    if (!geminiApiKey) {
      result.textContent = "API key not set. Please set it in options.";
      return;
    }
    //getting user article text
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(
        tab.id,
        { type: "getArticleText" },
        async ({ text }) => {
          if (!text) {
            result.textContent = "Could not extract article text.";
            return;
          }
          //calling api

          try {
            const summary = await getGeminiSummary(
              geminiApiKey,
              text,
              summaryType
            );
            result.textContent = summary;
          } catch (error) {
            result.textContent = "Error generating summary: " + error.message;
          }
        }
      );
    });
  });
});
async function getGeminiSummary(geminiApiKey, text, summaryType) {
  const max = 2000;
  const truncatedText =
    text.length > max ? text.slice(0, max) + "..." : text;

  const promptMap = {
    short: `Provide a brief summary of the following article in 2-3 sentences:\n\n${truncatedText}`,
    detailed: `Provide a detailed summary of the following article, covering all key points:\n\n${truncatedText}`,
    bullet: `Provide a summary of the following article in bullet points:\n\n${truncatedText}`,
  };

  const prompt = promptMap[summaryType] || promptMap.short;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: { temperature: 0.2 },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No summary generated.";
}
