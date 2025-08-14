document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm") as HTMLFormElement | null;
  const messageDiv = document.getElementById("registerMessage") as HTMLDivElement | null;

  if (!registerForm || !messageDiv) {
    console.error("Form veya mesaj div'i bulunamadı.");
    return;
  }

  registerForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const usernameInput = document.getElementById("username") as HTMLInputElement | null;
    const passwordInput = document.getElementById("password") as HTMLInputElement | null;

    if (!usernameInput || !passwordInput) {
      messageDiv.style.color = "red";
      messageDiv.textContent = "Username or password input not found.";
      return;
    }

    const username: string = usernameInput.value.trim();
    const password: string = passwordInput.value.trim();

    if (!username || !password) {
      messageDiv.style.color = "red";
      messageDiv.textContent = "Please fill in both username and password.";
      return;
    }

    try {
      const response: Response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "Register successful! Redirecting to login...";
        setTimeout(() => {
          window.location.href = "/login.html";
        }, 1500);
      } else {
        const error: { message?: string } = await response.json();
        messageDiv.style.color = "red";
        messageDiv.textContent = `Register failed: ${error.message || response.statusText}`;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Network error: " + err.message;
      } else {
        messageDiv.style.color = "red";
        messageDiv.textContent = "An unknown error occurred.";
      }
    }
  });
});
