document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("shortenForm") as HTMLFormElement | null;

  if (!form) {
    console.error("Form bulunamadı.");
    return;
  }

  form.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    const originalUrlInput = document.getElementById("originalUrl") as HTMLInputElement | null;
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

      const response = await fetch("/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ originalUrl }),
      });

      if (response.ok) {
        interface ResponseData {
          result: {
            shortUrl: string;
          };
        }

        const data: ResponseData = await response.json();

        alert(`Kısa link: ${data.result.shortUrl}`);
        localStorage.setItem("lastShortUrl", data.result.shortUrl);
        window.location.href = "/shorten/adv";
      } else {
        const err: { message?: string } = await response.json();
        alert(`Hata: ${err.message || response.statusText}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Network hatası: " + error.message);
      } else {
        alert("Bilinmeyen bir hata oluştu.");
      }
    }
  });
});
