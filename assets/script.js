
var question = $("#question");
var option1 = $("#op1");
var option2 = $("#op2");
var option3 = $("#op3");
var option4 = $("#op4");
var timer = document.getElementById("timer");
var scoreEl = $("#score");
var finalScore = $("#final-score");
var initialsInput = document.querySelector("#playerInitials");
var initialsList = document.querySelector("#scores-list");
var submitBtn = $("#submit");
var userInitialsSpan = document.getElementById("user-initials");

var index;
var count;
var score;
var timeLeft;
var results = [];

// event for start button
$("#start").on("click", startQuiz);

//start quiz function which calling 2 methods - set up the count and pull the questions
function startQuiz() {
    score = 0;
    index = 0;
    timeLeft = 60;
    start.style.display = "none";
    renderCounter();
    renderQuestion();
    quiz.style.display = "block";
    timer.textContent = "Time: " + timeLeft;

}

// questions Array of objects
var questions = [

    {
        "q": "Q.1 Which of the following statements will show a message as well as ask for user input in a popup?",
        "op1": "alert()",
        "op2": "prompt()",
        "op3": "confirm()",
        "op4": "message()",
        "correct": "prompt()"
    },
    {
        "q": "Q.2 Inside which HTML element do we put the JavaScript??",
        "op1": "<script>",
        "op2": "<>",
        "op3": "<js>",
        "op4": "<scripting>",
        "correct": "<script>"
    },
    {
        "q": "Q.3 Which are the correct if statements to execute certain code if “x” is equal to 2?",
        "op1": "if(x2)",
        "op2": "if(x = 2)",
        "op3": "if(x == 2)",
        "op4": "if(x != 2)",
        "correct": "if(x == 2)"
    },
    {
        "q": "Q.4 Which of the following will write the message “Hello World!” in an alert box?",
        "op1": "alertBox(“Hello World”);",
        "op2": "alert(Hello World!);",
        "op3": "msgAlert(“Hello World!”);",
        "op4": "alert(“Hello World!”);",
        "correct": "alert(“Hello World!”);"
    },
    {
        "q": "Q.5 How do you find the minimum of x and y using JavaScript?",
        "op1": "min(x,y);",
        "op2": "Math.min(x,y)",
        "op3": "Math.min(xy)",
        "op4": "min(xy);",
        "correct": "Math.min(x,y)"
    },
    {
        "q": "Q.6 What is the correct JavaScript syntax to print “Coding” in the console?",
        "op1": "print(“Coding”);",
        "op2": "console.print(“Coding”);",
        "op3": "log.console(“Coding”);",
        "op4": "console.log(“Coding”);",
        "correct": "console.log(“Coding”);"
    }

]

// function which printing questions and options
function renderQuestion() {
    question.text(questions[index].q);
    option1.text(questions[index].op1);
    option2.text(questions[index].op2);
    option3.text(questions[index].op3);
    option4.text(questions[index].op4);
}

// option event when user pick  up the answer and calls checkAnswer function 
$(".option").on("click", function () {
    console.log($(this).text())
    checkAnswer($(this).text());
});

// Create the countdown timer
function renderCounter() {
    count = setInterval(function () {
        timer.textContent = "Time: " + timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            timer.textContent = "Time: 0";
            clearInterval(count);
            endQuiz();
        }

    }, 1000);
}

//checking the answer
function checkAnswer(answer) {

    if (questions[index].correct === answer) {
        score++;
        scoreEl.text("Score: " + score);
    } else {
        timeLeft -= 5;
    }
}

// event for clicking on next button
$(".next").on("click", function () {

    if (index < questions.length - 1) {
        index++;
        console.log(index);
        renderQuestion();
    }
    else
        if (index === questions.length - 1) {
            clearInterval(count);
            endQuiz();
        }
});

// end quiz function when clicking last question
function endQuiz() {
    quiz.style.display = "none";
    done.style.display = "block";
    finalScore.text("Your final score is " + score);

}

// event for clicking on submit button, stores user results in local storage
submitBtn.on("click", function (e) {
    e.preventDefault();
    done.style.display = "none";
    result.style.display = "block";

    var results = {
        initials: initialsInput.value.trim(),
        scoreRes: score
    }
    console.log("first entered results: ", results);
    var storedResults = JSON.parse(localStorage.getItem("results")) || [];
    console.log("Stored " + storedResults);
    storedResults.push(results);
    storedResults.sort((a, b) => (a.scoreRes > b.scoreRes) ? -1 : 1)
    console.log(storedResults);
    localStorage.setItem("results", JSON.stringify(storedResults));

    highScores();
});

// function to print out 3 highest results from stored in local storage
function highScores() {
    var scores = JSON.parse(localStorage.getItem("results"));
    console.log("scores array from local storage: ", scores);
    var limit;

    if (scores.length < 3) {
        limit = scores.length
    } else {
        limit = 3;
    }

    for (var i = 0; i < limit; i++) {
        var initialsValue = scores[i].initials;
        var scoreValue = scores[i].scoreRes;

        var li = document.createElement("li");
        li.textContent = initialsValue + " - score [ " + scoreValue + " ]";
        li.setAttribute("data-index", i);
        initialsList.appendChild(li);
    }

}

// event for clicking play button
$("#play").on("click", function () {
    result.style.display = "none";
    $(initialsList).empty();
    initialsInput.value = "";
    startQuiz();
});

//event for clicking clear button to delete data from local storage
$("#clear").on("click", function () {
    $(initialsList).empty();
    results = [];
    localStorage.setItem("results", JSON.stringify(results));
});



