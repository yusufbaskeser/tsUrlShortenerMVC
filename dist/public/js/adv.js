"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const shortUrl = localStorage.getItem("lastShortUrl");
    if (!shortUrl) {
        alert("Yönlendirilecek kısa link bulunamadı!");
        return;
    }
    setTimeout(() => {
        window.location.href = shortUrl;
    }, 5000);
});
