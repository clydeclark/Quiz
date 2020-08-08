var score = 0;
var startBtn = document.getElementById("start-btn");
var questionCont = document.getElementById("question-container");
var answers = document.getElementById("answer-buttons");
var questionDisplay = document.getElementById("question")
var randomNum;
var timer;
var timerDisplay = document.getElementById("timer");
var scoreEl = document.getElementById("score");
var scoreList = document.getElementById("score-list");
var timerHandler;
var initials;
var scoreBoard = [];
var storedScores;

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

// Load stored values
function loadScores() {
    storedScores = JSON.parse(localStorage.getItem("score-board"));

    if (storedScores !== null) {
        scoreBoard = storedScores;
    }
}

// When clicked, hides start button, shows questions and starts the timer
function startQuiz() {
    loadScores();
    startBtn.classList.add("hide");
    questionCont.classList.remove("hide");
    populateQuestion();
    scoreEl.textContent = 0;
    timer = 30;
    timerHandler = setInterval(function () {
        timer--;
        if (timer <= 0) {
            clearInterval(timerHandler);
            endQuiz();
        }
        timerDisplay.textContent = timer;
    }, 1000)
}

function endQuiz() {
    questionCont.classList.add("hide");
    initials = prompt("Enter your initials");
    var user = {
        Name: initials,
        Score: score
    };
    scoreBoard.push(user);
    if (scoreBoard.length > 5) {
        scoreBoard.splice(0, 1);
    }
    localStorage.setItem("score-board", JSON.stringify(scoreBoard));
    printScores();
    console.log(localStorage);
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
            scoreEl.textContent = score;
        } else {
            timer -= 5;
        }
        myQuestions.splice(randomNum, 1);
        populateQuestion();
    } catch (error) {
        clearInterval(timerHandler);
        endQuiz();
    }
}

function printScores() {
    // Clear list
    scoreList.innerHTML = "";

    // Render a new li for each item
    for (var i = 0; i < scoreBoard.length; i++) {
        var scoreItem = scoreBoard[i];

        var li = document.createElement("li");
        li.textContent = scoreItem;

        scoreList.appendChild(li);
    }
}



startBtn.addEventListener("click", startQuiz);