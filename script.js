var score = 0;
var startBtn = document.getElementById("start-btn");
var questionCont = document.getElementById("question-container");
var answers = document.getElementById("answer-buttons");
var questionDisplay = document.getElementById("question")
var answerBtn = document.getElementsByClassName("btn");
var randomNum;
var timer = 20;

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

// When clicked, hides start button and shows questions
function startQuiz() {
    startBtn.classList.add("hide");
    questionCont.classList.remove("hide");
    populateQuestion();
    setInterval(function () {
        timer--;
        console.log(timer);
    }, 1000)
}

// Randomizes display questions
function populateQuestion() {
    randomNum = Math.floor(Math.random() * myQuestions.length);
    questionDisplay.textContent = myQuestions[randomNum].question;

    for (var i = 0; i < answers.children.length; i++) {
        answers.children[i].textContent = myQuestions[randomNum].answers[i];
        answers.children[i].setAttribute("value", myQuestions[randomNum].answers[i]);
        answers.children[i].addEventListener("click", selectAnswer);
    }

}

// Checks for answer correctness
function selectAnswer(event) {
    if (event.target.value === myQuestions[randomNum].correctAnswer) {
        score++;
    } else {
        timer--;
    }
    populateQuestion();
}

startBtn.addEventListener("click", startQuiz);