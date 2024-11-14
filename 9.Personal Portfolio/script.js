document.getElementById("theme-change").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    this.textContent = "Light Mode";
  } else {
    this.textContent = "Dark Mode";
  }
});

const form = document.querySelector("form");
const submitButton = document.querySelector(".btn-btn2");
submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  alert(
    "Your response is received. I will contact you. Thank you for your response!"
  );

  form.reset();

  window.location.href = "index.html";
});
