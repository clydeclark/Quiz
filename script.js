var score = 0;
var startBtn = document.getElementById("start-btn");
var questionCont = document.getElementById("question-container");
var answers = document.getElementById("answer-buttons");
var questionDisplay = document.getElementById("question")
var answerBtn = document.getElementsByClassName("btn");

// Questions
var myQuestions = [{
        question: "What is 2 + 2?",
        answers: ["4", "6", "7", "2"],
        correctAnswer: "4"
    },
    {
        question: "What is 3 + 4?",
        answers: ["5", "7", "6", "4"],
        correctAnswer: "7"
    },
    {
        question: "What is 1 + 5?",
        answers: ["3", "6", "8", "5"],
        correctAnswer: "6"
    }
];

function startQuiz() {
    startBtn.classList.add("hide");
    questionCont.classList.remove("hide");
    nextQuestion();
    console.log(questionDisplay)
}

function nextQuestion() {
    randomNum = Math.floor(Math.random() * myQuestions.length);
    questionDisplay.textContent = myQuestions[randomNum].question;
    for (var i = 0; i < answers.children.length; i++) {
        answers.children[i].textContent = myQuestions[randomNum].answers[i];
    }
}

function selectAnswer(event) {
    if (event.target.tagName === "BUTTON") {
        console.log("answer button clicked");
    }
}

startBtn.addEventListener("click", startQuiz);
answers.addEventListener("click", selectAnswer);