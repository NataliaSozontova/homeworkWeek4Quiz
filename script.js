
var question = $("#question");
var option1 = $("#op1");
var option2 = $("#op2");
var option3 = $("#op3");
var option4 = $("#op4");
var timer = document.getElementById("timer");
var scoreEl = $("#score");
var finalScore = $("#finalScore");
var initialsInput = document.querySelector("#playerInitials");
// var initialsForm = document.querySelector("#initials-form");
// var initialsList = document.querySelector("#initials-list");
var submitBtn = $("#submit");
var userInitialsSpan = document.getElementById("user-initials");
// var userScoreSpan = document.getElementById("user-score");


var index = 0;
var lastQuestIndex = 3;
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
        "q": "Q.1 What is JavaScript definition?",
        "op1": "a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible",
        "op2": "an object-oriented computer programming language commonly used to create interactive effects within web browsers",
        "op3": "an interpreted, object-oriented, high-level programming language with dynamic semantics",
        "op4": "an imperative and procedural programming language intended to encourage good programming practices using structured programming and data structuring",
        "correct": "an object-oriented computer programming language commonly used to create interactive effects within web browsers"
    },
    {
        "q": "Q.2 Inside which HTML element do we put the JavaScript??",
        "op1": "<javascript>",
        "op2": "<>",
        "op3": "<js>",
        "op4": "<scripting>",
        "correct": "<javascript>"
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
        "q": "Q.6 What is the correct JavaScript syntax to print “DataFlair” in the console?",
        "op1": "print(“DataFlair”);",
        "op2": "console.print(“DataFlair”);",
        "op3": "log.console(“DataFlair”);",
        "op4": "console.log(“DataFlair”);",
        "correct": "console.log(“DataFlair”);"
    }



]


function renderQuestion() {
    question.text(questions[index].q);
    option1.text(questions[index].op1);
    option2.text(questions[index].op2);
    option3.text(questions[index].op3);
    option4.text(questions[index].op4);
}

$(".option").on("click", function () {
    console.log($(this).text())
    checkAnswer($(this).text());
});

var timeLeft = 15;

function renderCounter() {
    // Create the countdown timer.
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
    console.log(index);
    if (questions[index].correct === answer) {
        score++;
        scoreEl.text("Score: " + score);
    } else {
        timeLeft -= 5;
    }

    if (index < lastQuestIndex) {
        $(".next").on("click", function () {
            index++;
            renderQuestion();
        }
        );
        //how to check when time is over
    } else
        if (index === lastQuestIndex || timer.text === "Time: 0") {
            endQuiz();
        }

}

function endQuiz() {
    quiz.style.display = "none";
    done.style.display = "block";
    finalScore.text("Your score is " + score);

}

submitBtn.on("click", function (e) {
    e.preventDefault();
    done.style.display = "none";
    result.style.display = "block";

    var results = {
        initials: initialsInput.value.trim(),
        scoreRes: score
    }
    console.log(score)
    console.log(results);

    // set new submission
    localStorage.setItem("results", JSON.stringify(results));

    // get most recent submission
    var storedResults = JSON.parse(localStorage.getItem("results"));
    console.log(storedResults);
    console.log(userInitialsSpan.textContent = storedResults.initials + " - " + storedResults.scoreRes);

    // If results were retrieved from localStorage, update the results array to it
    if (storedResults !== null) {
        results = storedResults;
    }
    console.log(results);
});




// var initials =[];

// function renderInitials() {
//     // Clear initialsList element
//     initialsList.innerHTML = "";

//     // Render a new li for each initials
//     for (var i = 0; i < initials.length; i++) {
//       var initial = initials[i];

//       var li = document.createElement("li");
//       li.textContent = initial + " - score [ " + score + " ]";
//       li.setAttribute("data-index", i);

//       var button = document.createElement("button");
//       button.textContent = "Clear";

//       li.appendChild(button);
//       initialsList.appendChild(li);
//     }
//   }

//   function init() {
//     // Get stored intials from localStorage
//     // Parsing the JSON string to an object
//     var storedInitials = JSON.parse(localStorage.getItem("initials"));

//     // If todos were retrieved from localStorage, update the todos array to it
//     if (storedInitials !== null) {
//       initials = storedInitials;
//     }

//     // Render todos to the DOM
//     renderInitials();
//   }


//   function storeInitials() {
//     // Stringify and set "initials" key in localStorage to todos array
//     localStorage.setItem("initials", JSON.stringify(initials));
//     localStorage.setItem("score", JSON.stringify(score));
//   }

//   // When form is submitted...
//     initialsForm.addEventListener("submit", function(event) {
//     event.preventDefault();

//     var initialsText = initialsInput.value.trim();

//     // Return from function early if submitted todoText is blank
//     if (initialsText === "") {
//       return;
//     }

//     // Add new initialText to todos array, clear the input
//     initials.push(initialsText);
//     initialsInput.value = "";

//     // Store updated todos in localStorage, re-render the list
//     storeInitials();
//     renderInitials();
//   });

//   // When a element inside of the initialsList is clicked...
// initialsList.addEventListener("click", function(event) {
//     var element = event.target;

//     // If that element is a button...
//     if (element.matches("button") === true) {
//       // Get its data-index value and remove the todo element from the list
//       var index = element.parentElement.getAttribute("data-index");
//       initials.splice(index, 1);

//       // Store updated todos in localStorage, re-render the list
//       storeInitials();
//       renderInitials();
//     }
//   });

// init();