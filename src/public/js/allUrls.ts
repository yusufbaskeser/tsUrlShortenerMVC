async function fetchAllUrls() {
    try {
      const res = await fetch("/user/list");
  
      if (!res.ok) {
        const err = await res.json();
        alert("Hata: " + (err.message || res.statusText));
        return;
      }
    } catch (e:any) {
      alert(e.message);
    }
  }
  
  document.addEventListener("DOMContentLoaded", fetchAllUrls);