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
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) {
        console.error("Login form not found.");
        return;
    }
    loginForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
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
            const response = yield fetch("/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = yield response.json();
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                window.location.href = "/home";
            }
            else {
                const error = yield response.json();
                alert(`Login failed: ${error.message || response.statusText}`);
            }
        }
        catch (err) {
            alert("Network error: " + err.message);
        }
    }));
});
