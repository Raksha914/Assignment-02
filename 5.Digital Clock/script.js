function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const is24HourFormat = document.getElementById("formatToggle").checked;

  if (!is24HourFormat && hours > 12) {
    hours -= 12;
  }
  hours = hours.toString().padStart(2, "0");

  document.getElementById(
    "timeDisplay"
  ).textContent = `${hours}:${minutes}:${seconds}`;
  document.getElementById(
    "dateDisplay"
  ).textContent = `${day}-${month}-${year}`;
}

document.getElementById("formatToggle").addEventListener("change", updateClock);

setInterval(updateClock, 1000);
updateClock();

document.getElementById("theme-change").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    this.textContent = "Light Mode";
  } else {
    this.textContent = "Dark Mode";
  }
});
