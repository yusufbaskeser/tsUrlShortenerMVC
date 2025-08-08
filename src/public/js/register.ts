document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm") as HTMLFormElement | null;

  if (!registerForm) {
    console.error("Register form bulunamadı.");
    return;
  }

  registerForm.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    const usernameInput = document.getElementById("username") as HTMLInputElement | null;
    const passwordInput = document.getElementById("password") as HTMLInputElement | null;

    if (!usernameInput || !passwordInput) {
      alert("Username ya da password inputu bulunamadı.");
      return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Register successful!");
      } else {
        const error: { message?: string } = await response.json();
        alert(`Register failed: ${error.message || response.statusText}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        alert("Network error: " + err.message);
      } else {
        alert("Bilinmeyen bir hata oluştu.");
      }
    }
  });
});
