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
function fetchAllUrls() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("/user/list");
            if (!res.ok) {
                const err = yield res.json();
                alert("Hata: " + (err.message || res.statusText));
                return;
            }
        }
        catch (e) {
            alert(e.message);
        }
    });
}
document.addEventListener("DOMContentLoaded", fetchAllUrls);
