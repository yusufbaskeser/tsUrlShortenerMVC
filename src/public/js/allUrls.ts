async function fetchAllUrls() {
  try {
    const res = await fetch("/user/list");

    if (!res.ok) {
      const err = await res.json();
      alert("Hata: " + (err.message || res.statusText));
      return;
    }

    const urls = await res.json();
    const urlList = document.getElementById("urlList");

    if (urlList) {
      urlList.innerHTML = ""; // Clear existing list
      urls.forEach((url: { originalUrl: string; shortUrl: string }) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${url.originalUrl}" target="_blank">${url.originalUrl}</a> - <a href="/${url.shortUrl}" target="_blank">${url.shortUrl}</a>`;
        urlList.appendChild(listItem);
      });
    }
  } catch (e: any) {
    alert(e.message);
  }
}

document.addEventListener("DOMContentLoaded", fetchAllUrls);