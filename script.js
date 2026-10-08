
 // Bansari Yadav — Lab 7

 // Part 1: JavaScript Connection
 console.log("script.js is connected");

 // Part 2: Variables and Data Types
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

 zipInput.addEventListener("input", checkZipCode);

 // Part 3: Like Counter
 const likeBtn = document.querySelector("#like-btn");
 const likeCount = document.querySelector("#like-count");
 let likes = 0;

 likeBtn.addEventListener("click", function() {
   likes = likes + 1;
   likeCount.textContent = `${likes} likes`;
 });

 // Part 4: Dark Mode Toggle
 const themeBtn = document.querySelector("#theme-btn");

 themeBtn.addEventListener("click", function() {
   document.body.classList.toggle("dark");
 });
