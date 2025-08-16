"use strict";
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("shortenForm");
    const input = document.getElementById("originalUrl");
    const resultMessage = document.getElementById("result-message");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const originalUrl = input.value.trim();
        if (!originalUrl) {
            resultMessage.textContent = "Please enter a URL!";
            return;
        }
        if (!isValidUrl(originalUrl)) {
            resultMessage.textContent = "Invalid URL format , Please enter a URL";
            return;
        }
        const token = localStorage.getItem("token") ?? "";
        if (!token) {
            resultMessage.innerHTML = `
        <span style="color:#f44336; font-weight:700;">
          You need to <a href="/login.html" style="color:#2196f3; text-decoration:none;">log in</a> or <a href="/register.html" style="color:#2196f3; text-decoration:none;">register</a> to use this feature.
        </span>
        <div style="margin-top: 8px; font-size: 0.9rem; color: #bbb;">
          You can click the links above to go there.
        </div>
      `;
            return;
        }
        try {
            const response = await fetch("/url/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ originalUrl }),
            });
            if (response.ok) {
                const data = await response.json();
                const fullShortUrl = `${window.location.origin.replace(/^https?:\/\//, '')}/${data.result.shortUrl}`;
                const fullShortUrlWithProtocol = `${window.location.origin}/${data.result.shortUrl}`;
                localStorage.setItem("lastShortUrl", data.result.shortUrl);
                resultMessage.innerHTML = `
        <a href="/adv.html" style="color:#2196f3; font-weight:700; text-decoration:none; cursor:pointer;">
          Shortened URL: ${fullShortUrl}
        </a>
        <button id="copyButton" style="background-color: #4CAF50; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px; vertical-align: middle;">Copy</button>
        <div style="color:#bbdefb; font-size:0.9rem; margin-top:4px; user-select:none;">
          Click the link above to visit.
        </div>
      `;
                const copyButton = document.getElementById("copyButton");
                if (copyButton) {
                    copyButton.addEventListener("click", () => {
                        navigator.clipboard.writeText(fullShortUrlWithProtocol);
                        alert("Copied to clipboard!");
                    });
                }
                input.value = "";
            }
            else {
                const err = await response.json();
                resultMessage.textContent = `Error: ${err.message || response.statusText}`;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                resultMessage.textContent = "Network error: " + error.message;
            }
            else {
                resultMessage.textContent = "Unknown error occurred.";
            }
        }
    });
});
//# sourceMappingURL=home.js.map