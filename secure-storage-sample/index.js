const secureStorage = require("uxp").storage.secureStorage;

async function saveSecureKey() {
  const userInput = document.getElementById("secure").value;
  await secureStorage.setItem("secure", userInput);
  document.getElementById("secure").value = "";
}

async function fetchSecureKey() {
  // We get the stored value from the secureStorage in the form of a uint8Array.
  const uintArray = await secureStorage.getItem("secure");
  // We convert the uint8Array to a string to present it to the user.
  let secureKey = "";
  for (let i of uintArray) secureKey += String.fromCharCode(i);
  document.getElementById("display").textContent = `
  Secure Key entered is ${secureKey}`;
}

document.getElementById("btnPopulate").addEventListener("click", saveSecureKey);
document.getElementById("btnDisplay").addEventListener("click", fetchSecureKey);
