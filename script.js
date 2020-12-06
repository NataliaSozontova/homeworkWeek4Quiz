
// var start = document.getElementById("start");
// var quiz = document.getElementById("quiz");

var question = $("#question");
var option1 = $("#op1");
var option2 = $("#op2");
var option3 = $("#op3");
var option4 = $("#op4");
var timer = document.getElementById("timer");
var scoreEl = $("#score");


var index = 0;
var lastQuestIndex = 10;
// var lastQuestion = questions.length - 1;
var count = 0;
var score = 0;


$("#start").on("click", startQuiz);

function startQuiz() {
    start.style.display = "none";
    renderCounter();
    renderQuestion();
    quiz.style.display = "block";

}
var questions = [

    {
        "q": "What is JavaScript definition?",
        "op1": "a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible",
        "op2": "an object-oriented computer programming language commonly used to create interactive effects within web browsers",
        "op3": "an interpreted, object-oriented, high-level programming language with dynamic semantics",
        "op4": "an imperative and procedural programming language intended to encourage good programming practices using structured programming and data structuring",
        "correct": "op2"
    },
    {
        "q": "How are u?",
        "op1": "a",
        "op2": "b",
        "op3": "c",
        "op4": "d"
    },
    {}
]


function renderQuestion() {
    question.text(questions[index].q);
    option1.text(questions[index].op1);
    option2.text(questions[index].op2);
    option3.text(questions[index].op3);
    option4.text(questions[index].op4);
}

$(".next").on("click", function () {

    index++;
    renderQuestion();
   
}

);

$(".option").on("click", checkAnswer($(this).text));//?????

function renderCounter() {
    // Create the countdown timer.
    var timeLeft = 5;
    var count = setInterval(function () {
        timer.textContent = "Time: " + timeLeft;
        timeLeft--;

        if (timeLeft === -1) {
            timer.textContent = "Time: 0";
            clearInterval(count);
        }

    }, 1000);
}


function checkAnswer(answer) {
    console.log("checking");
        if (questions[index].correct === answer) {
        score++;
    }

    if (index < lastQuestIndex) {
        $(".next").on("click", function () {

            index++;
            rendorQuestion();
        }
        );
    }

}