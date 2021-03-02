const secureStorage = require("uxp").storage.secureStorage;
const app = window.require("photoshop").app;


async function saveSecureKey() {
    const value = document.getElementById("secure").value;
    await secureStorage.setItem("secure", value);
    document.getElementById("secure").value = ""
}

async function fetchSecureKey() {
  const value = await secureStorage.getItem("secure");
  let string = "";
  for (let i of value) string += String.fromCharCode(i);
  document.getElementById("display").innerHTML = `
  <div>Secure Key entered is ${string}</div>`;
}

document.getElementById("btnPopulate").addEventListener("click", saveSecureKey);
document.getElementById("btnDisplay").addEventListener("click", fetchSecureKey);
