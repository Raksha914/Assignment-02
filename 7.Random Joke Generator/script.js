function getJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => response.json())
    .then((data) => {
      const jokeDisplay = document.getElementById("jokeDisplay");
      jokeDisplay.innerHTML = `<strong>${data.setup}</strong><br>${data.punchline}`;
    })
    .catch((error) => {
      console.error("Error fetching joke:", error);
      document.getElementById("jokeDisplay").innerText = "Failed to load joke.";
    });
}

getJoke();

document.getElementById("theme-change").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    this.textContent = "Light Mode";
  } else {
    this.textContent = "Dark Mode";
  }
});
