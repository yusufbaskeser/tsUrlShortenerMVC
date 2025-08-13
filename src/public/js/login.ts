document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;
  const messageDiv = document.getElementById("loginMessage") as HTMLDivElement | null;

  if (!loginForm || !messageDiv) {
    console.error("Login form veya mesaj div'i bulunamadı.");
    return;
  }

  loginForm.addEventListener("submit", async (e: Event) => {
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
      const response: Response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        messageDiv.style.color = "green";
        messageDiv.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        const error: { message?: string } = await response.json();
        messageDiv.style.color = "red";
        messageDiv.textContent = `Login failed: ${error.message || response.statusText}`;
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
