"use strict";
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Token bulunamadı, lütfen giriş yap bro!");
        return;
    }
    try {
        const res = await fetch("/user/myurls", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            const err = (await res.json());
            alert("Hata: " + (err.message || res.statusText));
            return;
        }
        const data = (await res.json());
        const urls = data.myurls;
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
          <a href="/api/v1/url/${item.shortUrl}" target="_blank">${window.location.origin}/api/v1/url/${item.shortUrl}</a>
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
});
//# sourceMappingURL=myurls.js.map