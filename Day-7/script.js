const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS"],
    answer: 2
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "React", "Angular"],
    answer: 0
  }
];

let current = 0;
let score = 0;
let timer;
let timeLeft = 10;
let totalTime = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");

startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  loadQuestion();
};

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  timeEl.textContent = timeLeft;
  timer = setInterval(updateTimer, 1000);

  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => checkAnswer(i);
    optionsEl.appendChild(li);
  });
}

function updateTimer() {
  timeLeft--;
  totalTime++;
  timeEl.textContent = timeLeft;
  if (timeLeft === 0) {
    nextQuestion();
  }
}

function checkAnswer(selected) {
  const correct = questions[current].answer;
  if (selected === correct) score++;
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultBox.classList.remove("hidden");
  document.getElementById("total").textContent = questions.length;
  document.getElementById("correct").textContent = score;
  document.getElementById("score").textContent = `${score}/${questions.length}`;
  document.getElementById("total-time").textContent = totalTime;
}

function restartQuiz() {
  current = 0;
  score = 0;
  totalTime = 0;
  resultBox.classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  loadQuestion();
}

nextBtn.onclick = nextQuestion;
loadQuestion();