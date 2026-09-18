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