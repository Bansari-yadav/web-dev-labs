
// Bansari Yadav — Lab 11
// Introduction to TypeScript

// ========================================
// Previous Lab — JavaScript Connection
// ========================================

console.log("TypeScript compiled successfully!");

// Variables and Data Types
const studentName: string = "Ada";
let labsCompleted: number = 6;
const isEnrolled: boolean = false;

labsCompleted += 1;

console.log(`${studentName} has completed ${labsCompleted} labs.`);
console.log("Enrolled:", isEnrolled);


// ========================================
// ZIP Code Validation
// ========================================

const zipInput = document.querySelector<HTMLInputElement>("#zip");
const zipResult = document.querySelector<HTMLElement>("#zip-result");

function checkZipCode(): void {
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

const likeBtn = document.querySelector<HTMLButtonElement>("#like-btn");
const likeCount = document.querySelector<HTMLElement>("#like-count");
const likeMessage = document.querySelector<HTMLElement>("#like-message");

const LikeCounter = {
  likes: Number(localStorage.getItem("likes")) || 0,

  increment(): void {
    this.likes += 1;
    localStorage.setItem("likes", this.likes.toString());
    this.render();
  },

  render(): void {
    if (likeCount) {
      likeCount.textContent = `${this.likes} likes`;
    }

    if (likeMessage) {
      if (this.likes >= 10) {
        likeMessage.textContent = "Wow, thanks for all the likes!";
      } else if (this.likes >= 5) {
        likeMessage.textContent = "Glad you like it!";
      } else {
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

likeBtn?.addEventListener("click", function(): void {
  LikeCounter.increment();
});


// ========================================
// Persistent Dark Mode
// ========================================

const themeBtn = document.querySelector<HTMLButtonElement>("#theme-btn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeBtn?.addEventListener("click", function(): void {
  document.body.classList.toggle("dark");

  const isDark: boolean = document.body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");
});


// ========================================
// Asynchronous JavaScript
// ========================================

function getGreetingAfterDelay(): Promise<string> {
  return new Promise<string>(function(resolve) {
    setTimeout(function(): void {
      resolve("Hello from the future!");
    }, 800);
  });
}

async function showGreeting(): Promise<void> {
  const message: string = await getGreetingAfterDelay();
  console.log("Async/await greeting:", message);
}

void showGreeting();


// ========================================
// LAB 11 — Typed Goals Array
// ========================================

const goals: string[] = ["HTML", "CSS", "JavaScript", "Git"];

const goalsList = document.querySelector<HTMLElement>("#goals-list");

if (goalsList) {
  goals.forEach(function(goal: string): void {
    const item = document.createElement("li");
    item.textContent = goal;
    goalsList.appendChild(item);
  });
}


// ========================================
// LAB 11 — CatFact Interface
// ========================================

interface CatFact {
  fact: string;
  length: number;
}

const factBtn = document.querySelector<HTMLButtonElement>("#fact-btn");
const factDisplay = document.querySelector<HTMLElement>("#fact-display");

async function loadFact(): Promise<void> {
  if (!factDisplay) return;

  factDisplay.textContent = "Loading...";

  try {
    const response = await fetch("https://catfact.ninja/fact");

    if (!response.ok) {
      throw new Error("Server responded with an error");
    }

    const data = (await response.json()) as CatFact;

    factDisplay.textContent = data.fact;

    console.log("Cat fact:", data.fact);
    console.log("Fact length:", data.length);

  } catch (error: unknown) {
    factDisplay.textContent =
      "Couldn't load a fact right now. Try again.";

    console.error("Cat Fact API error:", error);
  }
}

factBtn?.addEventListener("click", function(): void {
  void loadFact();
});


// ========================================
// Sequential vs Concurrent API Requests
// ========================================

async function fetchFactForTiming(): Promise<CatFact> {
  const response = await fetch("https://catfact.ninja/fact");

  if (!response.ok) {
    throw new Error("Server responded with an error");
  }

  return (await response.json()) as CatFact;
}

async function testSequential(): Promise<void> {
  console.time("sequential");

  const first = await fetchFactForTiming();
  const second = await fetchFactForTiming();

  console.timeEnd("sequential");
  console.log("Sequential facts:", first.fact, second.fact);
}

async function testConcurrent(): Promise<void> {
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

const locationBtn =
  document.querySelector<HTMLButtonElement>("#location-btn");

const locationDisplay =
  document.querySelector<HTMLElement>("#location-display");

if (locationBtn && locationDisplay) {
  locationBtn.addEventListener("click", function(): void {

    if (!("geolocation" in navigator)) {
      locationDisplay.textContent =
        "Geolocation isn't supported.";
      return;
    }

    locationDisplay.textContent = "Getting your location...";

    navigator.geolocation.getCurrentPosition(
      function(position: GeolocationPosition): void {
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);

        locationDisplay.textContent =
          `You're near ${lat}, ${lon}`;
      },

      function(error: GeolocationPositionError): void {
        locationDisplay.textContent =
          "Location could not be retrieved. Check browser permissions.";

        console.warn("Geolocation error:", error);
      }
    );
  });
}


// ========================================
// LAB 11 — Graduate Extension: Generics
// ========================================

function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

// Test 1 — Number
saveToStorage<number>("testLikes", 5);

const storedLikes = loadFromStorage<number>("testLikes");

console.log("Generic storage — Number:", storedLikes);

// Test 2 — CatFact
const sampleFact: CatFact = {
  fact: "Cats sleep for many hours every day.",
  length: 36
};

saveToStorage<CatFact>("lastFact", sampleFact);

const storedFact = loadFromStorage<CatFact>("lastFact");

console.log("Generic storage — CatFact:", storedFact);
