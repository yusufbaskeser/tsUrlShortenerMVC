document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;

  if (!loginForm) {
    console.error("Login form not found.");
    return;
  }

  loginForm.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const usernameInput = document.getElementById("username") as HTMLInputElement | null;
    const passwordInput = document.getElementById("password") as HTMLInputElement | null;

    if (!usernameInput || !passwordInput) {
      alert("Username or password input not found.");
      return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        window.location.href = "/home";
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.message || response.statusText}`);
      }
    } catch (err: any) {
      alert("Network error: " + err.message);
    }
  });
});
