"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("shortenForm");
    const input = document.getElementById("originalUrl");
    const resultMessage = document.getElementById("result-message");
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
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
        const token = (_a = localStorage.getItem("token")) !== null && _a !== void 0 ? _a : "";
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
            const response = yield fetch("/url/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ originalUrl }),
            });
            if (response.ok) {
                const data = yield response.json();
                localStorage.setItem("lastShortUrl", data.result.shortUrl);
                resultMessage.innerHTML = `
        <a href="/adv.html" style="color:#2196f3; font-weight:700; text-decoration:none; cursor:pointer;">
          Shortened URL: ${data.result.shortUrl}
        </a>
        <div style="color:#bbdefb; font-size:0.9rem; margin-top:4px; user-select:none;">
          Click the link above to visit.
        </div>
      `;
                input.value = "";
            }
            else {
                const err = yield response.json();
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
    }));
});
