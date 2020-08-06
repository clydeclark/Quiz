var score = 0;
var startBtn = document.getElementById("start-btn");
var questionCont = document.getElementById("question-container");
var answers = document.getElementById("answer-buttons");
var questionDisplay = document.getElementById("question")
var randomNum;
var timer = 60;
var timerDisplay = document.getElementById("timer");
var scoreEl = document.getElementById("score");


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
    },
    {
        question: "What is 3 + 5?",
        answers: ["3", "6", "8", "5"],
        correctAnswer: "8"
    },
    {
        question: "What is 10 + 5?",
        answers: ["13", "16", "18", "15"],
        correctAnswer: "15"
    }
];

// When clicked, hides start button and shows questions
function startQuiz() {
    startBtn.classList.add("hide");
    questionCont.classList.remove("hide");
    scoreEl.classList.remove("hide")
    populateQuestion();
    scoreEl.textContent = 0;
    var timerHandler = setInterval(function () {
        timer--;
        if (timer <= 0) {
            clearInterval(timerHandler);
            endQuiz();
        }
        timerDisplay.textContent = timer;
    }, 1000)
}

function endQuiz() {
    timer = 60;
    startBtn.classList.remove("hide");
    questionCont.classList.add("hide");
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
    try {
        if (event.target.value === myQuestions[randomNum].correctAnswer) {
            score++;
            scoreEl.firstChild.textContent = score;
        } else {
            timer = timer - 5;
        }
        myQuestions.splice(randomNum, 1);
        populateQuestion();
    } catch (error) {
        endQuiz();
    }
}



startBtn.addEventListener("click", startQuiz);