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
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("/user/list"); // Tüm URL'ler endpoint'i
        if (!res.ok) {
            const err = (yield res.json());
            alert("Hata: " + (err.message || res.statusText));
            return;
        }
        const urls = (yield res.json());
        const container = document.getElementById("myUrlList");
        if (!container) {
            console.error("URL listesi elementi bulunamadı.");
            return;
        }
        container.innerHTML = "";
        urls.forEach((item) => {
            const card = document.createElement("div");
            card.className = "url-card";
            card.innerHTML = `
        <div class="original-url">
          <p>Original URL:</p>
          <a href="${item.originalUrl}" target="_blank" rel="noopener noreferrer">${item.originalUrl}</a>
        </div>
        <div class="shortly-url">
          <p>Shortly:</p>
          <a href="http://localhost:3000/url/${item.shortUrl}" target="_blank" rel="noopener noreferrer">${item.shortUrl}</a>
        </div>
      `;
            container.appendChild(card);
        });
    }
    catch (e) {
        if (e instanceof Error) {
            alert("Network hatası: " + e.message);
        }
        else {
            alert("Bilinmeyen bir hata oluştu.");
        }
    }
}));
