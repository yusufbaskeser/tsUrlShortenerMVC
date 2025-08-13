"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const messageDiv = document.getElementById("registerMessage");
    if (!registerForm || !messageDiv) {
        console.error("Form veya mesaj div'i bulunamadı.");
        return;
    }
    registerForm.addEventListener("submit", async (e) => {
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
            const response = await fetch("/auth/register", {
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
            }
            else {
                const error = await response.json();
                messageDiv.style.color = "red";
                messageDiv.textContent = `Register failed: ${error.message || response.statusText}`;
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
//# sourceMappingURL=register.js.map