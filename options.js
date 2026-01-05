document.addEventListener("DOMContentLoaded", () => {
  console.log("OPTIONS JS LOADED");

  const input = document.getElementById("apiKey");
  const saveBtn = document.getElementById("savebtn");
  const successMsg = document.getElementById("successmsg");

  if (!input || !saveBtn) {
    console.error("Elements not found", { input, saveBtn });
    return;
  }

  saveBtn.addEventListener("click", () => {
    const apiKey = input.value.trim();
    console.log("CLICKED, value =", apiKey);

    if (!apiKey) {
      alert("API key is empty");
      return;
    }

    chrome.storage.local.set({ geminiApiKey: apiKey }, () => {
      successMsg.classList.remove("hidden");
      console.log("KEY SAVED");
    });
  });
});
