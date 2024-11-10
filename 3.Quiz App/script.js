let questions = {
  general: [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Rome"],
      answer: "Paris",
    },
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    {
      question: "Which is the biggest continent in the world?",
      options: ["North America", "Asia", "Africa"],
      answer: "Asia",
    },
    {
      question: "Which is the longest river in the world?",
      options: ["Great Ganga", "Nile", "Amazon"],
      answer: "Nile",
    },
    {
      question: "Which is the largest ocean in the world?",
      options: ["Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      answer: "Pacific Ocean",
    },
    {
      question: "Which bank is called bankers Bank of India?",
      options: [
        "Reserve Bank of India",
        "Punjab National Bank",
        "State Bank of India",
      ],
      answer: "Reserve Bank of India",
    },
    {
      question: "Which is the largest animal in the world?",
      options: ["Shark", "Blue whale", "Elephant"],
      answer: "Blue whale",
    },
  ],
  science: [
    {
      question: "What planet is known as the Red Planet?",
      options: ["Mars", "Earth", "Jupiter"],
      answer: "Mars",
    },
    {
      question: "What is the SI unit of force?",
      options: ["Watt", "Joule", "Newton"],
      answer: "Newton",
    },
    {
      question: "Which of these is not a type of electromagnetic radiation?",
      options: ["Sound waves", "Ultraviolet rays", "Gamma rays"],
      answer: "Sound waves",
    },
    {
      question: "Which of these is a vector quantity?",
      options: ["Mass", "Time", "Velocity"],
      answer: "Velocity",
    },
    {
      question:
        "Which law of motions stats that “For every action, there is an equal and opposite reaction”?",
      options: ["First law", "Second law", "Third law"],
      answer: "Water",
    },
  ],
};
let selectedCategory,
  currentQuestionIndex = 0,
  score = 0,
  timer;

function startQuiz() {
  selectedCategory = document.getElementById("category").value;
  document.getElementById("category-select").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  clearTimeout(timer);
  let questionData = questions[selectedCategory][currentQuestionIndex];
  document.getElementById("question").innerText = questionData.question;
  document.getElementById("options").innerHTML = questionData.options
    .map(
      (option, i) =>
        `<button onclick="selectAnswer('${option}')">${option}</button>`
    )
    .join("");
  timer = setTimeout(() => nextQuestion(), 50000);
}

function selectAnswer(answer) {
  if (answer === questions[selectedCategory][currentQuestionIndex].answer)
    score++;
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[selectedCategory].length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function endQuiz() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("score").style.display = "block";
  document.getElementById("score-value").innerText = score;
  document.getElementById("performance-message").innerText =
    score > 1 ? "Great job!" : "Better luck next time!";
}

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("score").style.display = "none";
  document.getElementById("category-select").style.display = "block";
}
