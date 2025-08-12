interface UrlItem {
  originalUrl: string;
  shortUrl: string;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/user/list");  // Tüm URL'ler endpoint'i

    if (!res.ok) {
      const err = (await res.json()) as { message?: string };
      alert("Hata: " + (err.message || res.statusText));
      return;
    }

    const urls = (await res.json()) as UrlItem[];

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
  } catch (e) {
    if (e instanceof Error) {
      alert("Network hatası: " + e.message);
    } else {
      alert("Bilinmeyen bir hata oluştu.");
    }
  }
});
