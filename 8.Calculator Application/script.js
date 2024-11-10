let display = document.getElementById("display");

function appendValue(value) {
  if (display.value === "Error") display.value = "";
  display.value += value;
}

function calculate() {
  try {
    let result = eval(display.value.replace("÷", "/").replace("×", "*"));
    display.value = result === Infinity || isNaN(result) ? "Error" : result;
  } catch (error) {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = "";
}

document.getElementById("theme-change").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    this.textContent = "Light Mode";
  } else {
    this.textContent = "Dark Mode";
  }
});
