document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("apiKey");
  const saveBtn = document.getElementById("savebtn");
  const success = document.getElementById("successmsg");

  chrome.storage.sync.get(["geminiApiKey"], (res) => {
    if (res.geminiApiKey) input.value = res.geminiApiKey;
  });

  saveBtn.addEventListener("click", () => {
    const key = input.value.trim();
    if (!key) return alert("API key empty");

    chrome.storage.sync.set({ geminiApiKey: key }, () => {
      success.classList.remove("hidden");
      setTimeout(() => success.classList.add("hidden"), 1500);
    });
  });
});
