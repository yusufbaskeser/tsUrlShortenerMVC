"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const messageDiv = document.getElementById("loginMessage");
    if (!loginForm || !messageDiv) {
        console.error("Login form veya mesaj div'i bulunamadı.");
        return;
    }
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        if (!usernameInput || !passwordInput) {
            messageDiv.style.color = "red";
            messageDiv.textContent = "Username or password input not found.";
            return;
        }
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (!username || !password) {
            messageDiv.style.color = "red";
            messageDiv.textContent = "Please fill in both username and password.";
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
                messageDiv.style.color = "green";
                messageDiv.textContent = "Login successful! Redirecting...";
                setTimeout(() => {
                    window.location.href = "/home";
                }, 1500);
            }
            else {
                const error = await response.json();
                messageDiv.style.color = "red";
                messageDiv.textContent = `Login failed: ${error.message || response.statusText}`;
            }
        }
        catch (err) {
            if (err instanceof Error) {
                messageDiv.style.color = "red";
                messageDiv.textContent = "Network error: " + err.message;
            }
            else {
                messageDiv.style.color = "red";
                messageDiv.textContent = "An unknown error occurred.";
            }
        }
    });
});
//# sourceMappingURL=login.js.map