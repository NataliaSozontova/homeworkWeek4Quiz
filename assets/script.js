
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
var lastQuestIndex = 5;
var count;
var score;
var timeLeft;
var results;

$("#start").on("click", startQuiz);

function startQuiz() {
    score = 0;
    index = 0;
    timeLeft = 35;
    start.style.display = "none";
    renderCounter();
    renderQuestion();
    quiz.style.display = "block";
    timer.textContent = "Time: " + timeLeft;

}
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


function renderCounter() {
    // Create the countdown timer.
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


function checkAnswer(answer) {

    if (questions[index].correct === answer) {
        score++;
        scoreEl.text("Score: " + score);
    } else {
        timeLeft -= 5;
    }
}

$(".next").on("click", function () {

    if (index < questions.length - 1) {
        index++;
        console.log(index);
        renderQuestion();
    } //how to check when time is over
    else
        if (index === questions.length - 1) {
            clearInterval(count);
            endQuiz();
        }
});


function endQuiz() {
    quiz.style.display = "none";
    done.style.display = "block";
    finalScore.text("Your final score is " + score);

}

submitBtn.on("click", function (e) {
    e.preventDefault();
    done.style.display = "none";
    result.style.display = "block";

     results = {
        initials: initialsInput.value.trim(),
        scoreRes: score
    }

    var storedResults = JSON.parse(localStorage.getItem("results")) || [];
    console.log("Stored " + storedResults);
    storedResults.push(results);
    storedResults.sort((a, b) => (a.scoreRes > b.scoreRes) ? -1 : 1)
    console.log(storedResults);
    localStorage.setItem("results", JSON.stringify(storedResults));

    highScores();
});

function highScores(){
    var scores = JSON.parse(localStorage.getItem("results"));

     // Render a new li for each object of scores Array
    for (var i = 0; i < 3; i++) {
      var initialsValue = scores[i].initials;
      var scoreValue = scores[i].scoreRes;

      var li = document.createElement("li");
      li.textContent = initialsValue + " - score [ " + scoreValue + " ]";
      li.setAttribute("data-index", i);
      initialsList.appendChild(li);
    }
}

$("#play").on("click", function() {
    result.style.display = "none";
    $(initialsList).empty();
    initialsInput.value = "";
    startQuiz();
});

$("#clear").on("click", function() {
    $(initialsList).empty();
    results = [];
    localStorage.setItem("results", JSON.stringify(results));
});



    // if(storedResults == null){
    //     var storageArray = [];
    //     storageArray.push(results);
    //     console.log(storageArray);
    //     console.log(localStorage.setItem("results", JSON.stringify(storageArray)));
    //     var storedResults = JSON.parse(localStorage.getItem("results"));
    //     userInitialsSpan.textContent = storedResults.initials + " - " + storedResults.scoreRes;
    //     // console.log(storageArray);
    //     // localStorage.setItem(storageArray);

    // } else {
    //     // storedResults.push(results);
    //     // localStorage.setItem(storedResults);
    //     console.log(storedResults);
    // }
    // console.log(score)
    // console.log(results);

    //  var storageArray = [];
    //  storageArray.push(results);
    //  console.log(storageArray);

    // // get most recent submission
    // var storedResults = JSON.parse(localStorage.getItem("results"));
    // console.log(storedResults);
    // console.log(userInitialsSpan.textContent = storedResults.initials + " - " + storedResults.scoreRes);

    // // If results were retrieved from localStorage, update the results array to it
    // if (storedResults == null) {
    //     // results = storedResults;
    //     localStorage.setItem(storageArray);
    // }else {

    // }

    // // set new submission
    // localStorage.setItem("results", JSON.stringify(results));


    // console.log(results);





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