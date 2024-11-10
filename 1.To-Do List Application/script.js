document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const priority = document.getElementById("priority");
  const taskBtn = document.getElementById("Task-btn");
  const unorderedlist = document.getElementById("unordered-list");
  const btnthemetoggle = document.getElementById("btn-toggle");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function savingTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function taskrendered(button = "all") {
    unorderedlist.innerHTML = "";
    const taskFilter = tasks.filter((task) =>
      button === "completed"
        ? task.completed
        : button === "active"
        ? !task.completed
        : true
    );
    taskFilter.forEach((task) => {
      const li = document.createElement("li");
      li.style.maxWidth = "90%";
      // li.style.backgroundColor = "yellow";
      li.className = task.completed ? "completed" : "";
      li.textContent = `${task.title} [${task.priority}]`;

      const togglebtn = document.createElement("button");
      togglebtn.classList.add("togglebtn");
      togglebtn.textContent = task.completed ? "Undo" : "Done";
      togglebtn.onclick = () => {
        task.completed = !task.completed;
        savingTask();
        taskrendered(button);
      };
      const deletebtn = document.createElement("button");
      deletebtn.textContent = "Delete";
      deletebtn.classList.add("deletbtn");
      deletebtn.addEventListener("click", () => {
        tasks = tasks.filter((t) => t !== task);
        savingTask();
        taskrendered(button);
      });
      li.appendChild(togglebtn);
      li.appendChild(deletebtn);
      unorderedlist.appendChild(li);
    });
  }
  taskBtn.onclick = () => {
    const title = input.value.trim();
    const prioritylist = priority.value;
    if (title) {
      if (prioritylist !== "Select Priority") {
        tasks.push({ title, priority: prioritylist, completed: false });
        savingTask();
        taskrendered("all");
        input.value = "";
      } else {
        alert("Please select a priority for the task.");
      }
    } else {
      alert("Please enter a task title.");
    }
  };

  btnthemetoggle.onclick = () => {
    document.body.classList.toggle("dark-mode");
    taskBtn.classList.toggle("color-change");
    const all = document.getElementById("all");
    all.classList.toggle("color-change");
    const completed = document.getElementById("completed");
    completed.classList.toggle("color-change");
    const incompleted = document.getElementById("incompleted");
    incompleted.classList.toggle("color-change");
    btnthemetoggle.classList.toggle("color-change");
    const sort = document.getElementById("sort");
    sort.classList.toggle("color-change");
  };

  document.getElementById("all").onclick = () => taskrendered("all");
  document.getElementById("completed").onclick = () =>
    taskrendered("completed");
  document.getElementById("incompleted").onclick = () => taskrendered("active");

  document.getElementById("sort").onclick = () => {
    const priorities = { High: 1, Medium: 2, Low: 3 };

    tasks.sort((a, b) => priorities[a.priority] - priorities[b.priority]);
    savingTask();
    taskrendered();
  };
  taskrendered();
});
