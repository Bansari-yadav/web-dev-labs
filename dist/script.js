"use strict";
// Bansari Yadav — Lab 11
// Introduction to TypeScript
// ========================================
// Previous Lab — JavaScript Connection
// ========================================
console.log("TypeScript compiled successfully!");
// Variables and Data Types
const studentName = "Ada";
let labsCompleted = 6;
const isEnrolled = false;
labsCompleted += 1;
console.log(`${studentName} has completed ${labsCompleted} labs.`);
console.log("Enrolled:", isEnrolled);
// ========================================
// ZIP Code Validation
// ========================================
const zipInput = document.querySelector("#zip");
const zipResult = document.querySelector("#zip-result");
function checkZipCode() {
    const zipPattern = /^\d{5}$/;
    const isValidZip = zipPattern.test(zipInput?.value ?? "");
    if (zipResult) {
        zipResult.textContent = isValidZip
            ? "Valid ZIP code."
            : "Invalid ZIP code. Enter exactly five digits.";
    }
}
zipInput?.addEventListener("input", checkZipCode);
// ========================================
// LAB 11 — LikeCounter with TypeScript
// ========================================
const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
const likeMessage = document.querySelector("#like-message");
const LikeCounter = {
    likes: Number(localStorage.getItem("likes")) || 0,
    increment() {
        this.likes += 1;
        localStorage.setItem("likes", this.likes.toString());
        this.render();
    },
    render() {
        if (likeCount) {
            likeCount.textContent = `${this.likes} likes`;
        }
        if (likeMessage) {
            if (this.likes >= 10) {
                likeMessage.textContent = "Wow, thanks for all the likes!";
            }
            else if (this.likes >= 5) {
                likeMessage.textContent = "Glad you like it!";
            }
            else {
                likeMessage.textContent = "";
            }
        }
    }
};
// ========================================
// LAB 11 — INTENTIONAL TYPESCRIPT ERROR
// ========================================
// This line is deliberately incorrect.
// Take your professor's screenshot before removing it.
// LikeCounter.likes = "five";
// ========================================
// Restore saved likes and button listener
// ========================================
LikeCounter.render();
likeBtn?.addEventListener("click", function () {
    LikeCounter.increment();
});
// ========================================
// Persistent Dark Mode
// ========================================
const themeBtn = document.querySelector("#theme-btn");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}
themeBtn?.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});
// ========================================
// Asynchronous JavaScript
// ========================================
function getGreetingAfterDelay() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve("Hello from the future!");
        }, 800);
    });
}
async function showGreeting() {
    const message = await getGreetingAfterDelay();
    console.log("Async/await greeting:", message);
}
void showGreeting();
// ========================================
// LAB 11 — Typed Goals Array
// ========================================
const goals = ["HTML", "CSS", "JavaScript", "Git"];
const goalsList = document.querySelector("#goals-list");
if (goalsList) {
    goals.forEach(function (goal) {
        const item = document.createElement("li");
        item.textContent = goal;
        goalsList.appendChild(item);
    });
}
const factBtn = document.querySelector("#fact-btn");
const factDisplay = document.querySelector("#fact-display");
async function loadFact() {
    if (!factDisplay)
        return;
    factDisplay.textContent = "Loading...";
    try {
        const response = await fetch("https://catfact.ninja/fact");
        if (!response.ok) {
            throw new Error("Server responded with an error");
        }
        const data = (await response.json());
        factDisplay.textContent = data.fact;
        console.log("Cat fact:", data.fact);
        console.log("Fact length:", data.length);
    }
    catch (error) {
        factDisplay.textContent =
            "Couldn't load a fact right now. Try again.";
        console.error("Cat Fact API error:", error);
    }
}
factBtn?.addEventListener("click", function () {
    void loadFact();
});
// ========================================
// Sequential vs Concurrent API Requests
// ========================================
async function fetchFactForTiming() {
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) {
        throw new Error("Server responded with an error");
    }
    return (await response.json());
}
async function testSequential() {
    console.time("sequential");
    const first = await fetchFactForTiming();
    const second = await fetchFactForTiming();
    console.timeEnd("sequential");
    console.log("Sequential facts:", first.fact, second.fact);
}
async function testConcurrent() {
    console.time("concurrent");
    const [first, second] = await Promise.all([
        fetchFactForTiming(),
        fetchFactForTiming()
    ]);
    console.timeEnd("concurrent");
    console.log("Concurrent facts:", first.fact, second.fact);
}
// ========================================
// Geolocation API
// ========================================
const locationBtn = document.querySelector("#location-btn");
const locationDisplay = document.querySelector("#location-display");
if (locationBtn && locationDisplay) {
    locationBtn.addEventListener("click", function () {
        if (!("geolocation" in navigator)) {
            locationDisplay.textContent =
                "Geolocation isn't supported.";
            return;
        }
        locationDisplay.textContent = "Getting your location...";
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude.toFixed(2);
            const lon = position.coords.longitude.toFixed(2);
            locationDisplay.textContent =
                `You're near ${lat}, ${lon}`;
        }, function (error) {
            locationDisplay.textContent =
                "Location could not be retrieved. Check browser permissions.";
            console.warn("Geolocation error:", error);
        });
    });
}
// ========================================
// LAB 11 — Graduate Extension: Generics
// ========================================
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
}
// Test 1 — Number
saveToStorage("testLikes", 5);
const storedLikes = loadFromStorage("testLikes");
console.log("Generic storage — Number:", storedLikes);
// Test 2 — CatFact
const sampleFact = {
    fact: "Cats sleep for many hours every day.",
    length: 36
};
saveToStorage("lastFact", sampleFact);
const storedFact = loadFromStorage("lastFact");
console.log("Generic storage — CatFact:", storedFact);
