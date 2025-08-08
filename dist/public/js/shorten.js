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
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("shortenForm");
    if (!form) {
        console.error("Form bulunamadı.");
        return;
    }
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const originalUrlInput = document.getElementById("originalUrl");
        if (!originalUrlInput) {
            alert("URL inputu bulunamadı.");
            return;
        }
        const originalUrl = originalUrlInput.value.trim();
        if (!originalUrl) {
            alert("Lütfen bir link gir!");
            return;
        }
        try {
            const token = localStorage.getItem("token");
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
                alert(`Kısa link: ${data.result.shortUrl}`);
                localStorage.setItem("lastShortUrl", data.result.shortUrl);
                window.location.href = "/shorten/adv";
            }
            else {
                const err = yield response.json();
                alert(`Hata: ${err.message || response.statusText}`);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                alert("Network hatası: " + error.message);
            }
            else {
                alert("Bilinmeyen bir hata oluştu.");
            }
        }
    }));
});
