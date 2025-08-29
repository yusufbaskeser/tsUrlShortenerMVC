interface UrlItem {
  originalUrl: string;
  shortUrl: string;
}

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
      const err = (await res.json()) as { message?: string };
      alert("Hata: " + (err.message || res.statusText));
      return;
    }

    const data = (await res.json()) as { myurls: UrlItem[] };
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

      const formattedOriginalUrl = item.originalUrl.startsWith("http") ? item.originalUrl : `https://${item.originalUrl}`;
      const fullShortUrl = `${window.location.origin.replace(/^https?:\/\//, '')}/${item.shortUrl}`;
      const fullShortUrlWithProtocol = `${window.location.origin}/${item.shortUrl}`;
      card.innerHTML = `
        <div class="original-url">
          <p>Original URL:</p>
          <a href="${formattedOriginalUrl}" target="_blank" rel="noopener noreferrer">${item.originalUrl}</a>
        </div>
        <div class="shortly-url">
          <p>Shortly:</p>
          <a href="/${item.shortUrl}" target="_blank">${fullShortUrl}</a>
          <button class="copyButton" data-url="${fullShortUrlWithProtocol}" style="background-color: #4CAF50; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px; vertical-align: middle;">Copy</button>
        </div>
      `;

      container.appendChild(card);
    });

    const copyButtons = document.querySelectorAll(".copyButton");
    copyButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const url = (event.target as HTMLButtonElement).dataset.url;
        if (url) {
          navigator.clipboard.writeText(url);
          alert("Copied to clipboard!");
        }
      });
    });
  } catch (e) {
    if (e instanceof Error) {
      alert("Network hatası: " + e.message);
    } else {
      alert("Bilinmeyen bir hata oluştu.");
    }
  }
});
