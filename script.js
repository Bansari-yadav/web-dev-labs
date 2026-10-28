
// Bansari Yadav — Lab 8

// Previous Lab: JavaScript Connection
console.log("script.js is connected");

// Previous Lab: Variables and Data Types
const name = "Ada";
let labsCompleted = 6;
let isEnrolled = false;

labsCompleted = labsCompleted + 1;
console.log(`${name} has completed ${labsCompleted} labs.`);

// Previous Lab: ZIP Code Validation
const zipInput = document.querySelector("#zip");
const zipResult = document.querySelector("#zip-result");

function checkZipCode() {
  const zipPattern = /^\d{5}$/;
  const isValidZip = zipPattern.test(zipInput.value);

  console.log(isValidZip);

  if (isValidZip) {
    zipResult.textContent = "Valid ZIP code.";
  } else {
    zipResult.textContent =
      "Invalid ZIP code. Enter exactly five digits.";
  }
}

if (zipInput && zipResult) {
  zipInput.addEventListener("input", checkZipCode);
}

// Lab 8 — Graduate Extension: Closure-Based Module

const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
const likeMessage = document.querySelector("#like-message");

// Display function with conditional messages
function updateLikeDisplay(count) {
  if (likeCount) {
    likeCount.textContent = `${count} likes`;
  }

  if (likeMessage) {
    if (count >= 10) {
      likeMessage.textContent =
        "Wow, thanks for all the likes!";
    } else if (count >= 5) {
      likeMessage.textContent =
        "Glad you like it!";
    } else {
      likeMessage.textContent = "";
    }
  }
}

// Closure-based counter with private state
function createLikeCounter() {
  let likes = 0;

  return {
    increment() {
      likes++;
      updateLikeDisplay(likes);
    },

    getLikes() {
      return likes;
    }
  };
}

// Create the counter
const counter = createLikeCounter();

// Part 4: Defensive event listener
if (likeBtn) {
  likeBtn.addEventListener("click", function() {
    counter.increment();
  });
} else {
  console.warn("like-btn not found on this page");
}

// Previous Lab: Dark Mode Toggle
const themeBtn = document.querySelector("#theme-btn");

if (themeBtn) {
  themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark");
  });
}

// Bansari Yadav - Lab 9

// console.log("1. Starting");

// setTimeout(function() {
//   console.log("2. This runs later");
// }, 1000);

// console.log("3. This runs immediately");
function getGreetingAfterDelay() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve("Hello from the future!");
    }, 800);
  });
}

// getGreetingAfterDelay().then(function(message) {
//   console.log(message);
// });
async function showGreeting() {
  const message = await getGreetingAfterDelay();
  console.log(message);
}

showGreeting();

const goals = ["HTML", "CSS", "JavaScript", "Git"];
const goalsList = document.querySelector("#goals-list");

if (goalsList) {
  goals.forEach(function(goal) {
    const item = document.createElement("li");
    item.textContent = goal;
    goalsList.appendChild(item);
  });
}
const factBtn = document.querySelector("#fact-btn");
const factDisplay = document.querySelector("#fact-display");

async function loadFact() {
  factDisplay.textContent = "Loading...";

  try {
    const response = await fetch("https://catfact.ninja/fact");

    if (!response.ok) {
      throw new Error("Server responded with an error");
    }

    const data = await response.json();
    factDisplay.textContent = data.fact;
  } catch (error) {
    factDisplay.textContent =
      "Couldn't load a fact right now. Try again.";

    console.error(error);
  }
}

factBtn.addEventListener("click", loadFact);