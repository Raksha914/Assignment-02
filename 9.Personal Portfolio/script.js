const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  document.body.classList.add("header");

  themeToggle.textContent = document.body.classList.contains("light-theme")
    ? "Dark Mode"
    : "Light Mode";

  //   const textElements = document.querySelectorAll("p, h1, h2, a");
  //   textElements.forEach((el) => {
  //     el.style.color = document.body.classList.contains("light-theme")
  //       ? "#333"
  //       : "#fff";
  //   });
});
