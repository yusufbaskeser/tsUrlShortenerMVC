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
    if (!registerForm) {
        console.error("Register form bulunamadı.");
        return;
    }
    registerForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
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
            const response = yield fetch("/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = yield response.json();
                alert("Register successful!");
            }
            else {
                const error = yield response.json();
                alert(`Register failed: ${error.message || response.statusText}`);
            }
        }
        catch (err) {
            if (err instanceof Error) {
                alert("Network error: " + err.message);
            }
            else {
                alert("Bilinmeyen bir hata oluştu.");
            }
        }
    }));
});
