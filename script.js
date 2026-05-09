const quizData = {

  general: [
    {
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
      answer: "Delhi"
    },
    {
      question: "Which planet is known as Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: "Mars"
    }
  ],

  javascript: [
    {
      question: "Which keyword declares a variable?",
      options: ["var", "loop", "define", "print"],
      answer: "var"
    },
    {
      question: "Which symbol is used for comments?",
      options: ["//", "##", "**", "!!"],
      answer: "//"
    }
  ],

  html: [
    {
      question: "HTML stands for?",
      options: [
        "Hyper Text Markup Language",
        "High Transfer Machine Language",
        "Hyper Tool Multi Language",
        "None"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which tag is used for paragraph?",
      options: ["<p>", "<h1>", "<div>", "<span>"],
      answer: "<p>"
    }
  ]

};

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let selectedQuiz = [];

function startQuiz(){

  const category =
    document.getElementById("categorySelect").value;

  selectedQuiz = quizData[category];

  document.getElementById("quizBox")
    .classList.remove("hidden");

  document.querySelector(".start-btn")
    .classList.add("hidden");

  document.querySelector(".category-box")
    .classList.add("hidden");

  loadQuestion();
}

function loadQuestion(){

  resetTimer();

  const current =
    selectedQuiz[currentQuestion];

  document.getElementById("question").innerText =
    current.question;

  const answersDiv =
    document.getElementById("answers");

  answersDiv.innerHTML = "";

  current.options.forEach(option => {

    const button =
      document.createElement("button");

    button.innerText = option;

    button.classList.add("answer-btn");

    button.onclick = () => checkAnswer(button, option);

    answersDiv.appendChild(button);

  });

  updateProgress();
}

function checkAnswer(button, option){

  const correctAnswer =
    selectedQuiz[currentQuestion].answer;

  const buttons =
    document.querySelectorAll(".answer-btn");

  buttons.forEach(btn => btn.disabled = true);

  if(option === correctAnswer){

    button.classList.add("correct");
    score++;

    document.getElementById("score").innerText =
      score;
  }
  else{

    button.classList.add("wrong");

    buttons.forEach(btn => {

      if(btn.innerText === correctAnswer){
        btn.classList.add("correct");
      }

    });
  }

  clearInterval(timer);
}

function nextQuestion(){

  currentQuestion++;

  if(currentQuestion < selectedQuiz.length){

    loadQuestion();
  }
  else{

    endQuiz();
  }
}

function endQuiz(){

  document.getElementById("quizBox")
    .classList.add("hidden");

  document.getElementById("resultBox")
    .classList.remove("hidden");

  document.getElementById("finalScore").innerText =
    `${score} / ${selectedQuiz.length}`;
}

function restartQuiz(){

  location.reload();
}

function updateProgress(){

  const progress =
    ((currentQuestion + 1) / selectedQuiz.length) * 100;

  document.getElementById("progressBar").style.width =
    `${progress}%`;
}

function resetTimer(){

  clearInterval(timer);

  timeLeft = 15;

  document.getElementById("timer").innerText =
    timeLeft;

  timer = setInterval(() => {

    timeLeft--;

    document.getElementById("timer").innerText =
      timeLeft;

    if(timeLeft === 0){

      clearInterval(timer);

      nextQuestion();
    }

  }, 1000);

}