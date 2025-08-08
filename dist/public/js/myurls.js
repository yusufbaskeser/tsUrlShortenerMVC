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
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Token bulunamadı, lütfen giriş yap bro!");
        return;
    }
    try {
        const res = yield fetch("/user/myurls", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            const err = yield res.json();
            alert("Hata: " + (err.message || res.statusText));
            return;
        }
        const urls = yield res.json();
        const list = document.getElementById("myUrlList");
        if (!list) {
            console.error("URL listesi elementi bulunamadı.");
            return;
        }
        list.innerHTML = "";
        urls.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `Orijinal: ${item.originalUrl} — Kısa: <a href="http://localhost:3000/url/${item.shortUrl}" target="_blank">${item.shortUrl}</a>`;
            list.appendChild(li);
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
