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
      const err: { message?: string } = await res.json();
      alert("Hata: " + (err.message || res.statusText));
      return;
    }

    interface UrlItem {
      originalUrl: string;
      shortUrl: string;
    }

    const data = await res.json();
    const urls: UrlItem[] = data.myurls;

    const list = document.getElementById("myUrlList") as HTMLUListElement | null;
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
  } catch (e) {
    if (e instanceof Error) {
      alert("Network hatası: " + e.message);
    } else {
      alert("Bilinmeyen bir hata oluştu.");
    }
  }
});
