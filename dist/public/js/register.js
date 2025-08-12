"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const messageDiv = document.getElementById("registerMessage");
    if (!registerForm || !messageDiv) {
        console.error("Form veya mesaj div'i bulunamadı.");
        return;
    }
    registerForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
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
            const response = yield fetch("/auth/register", {
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
                const error = yield response.json();
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
    }));
});
