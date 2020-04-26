var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;
var feedbackEl = document.getElementById("feedback");


var questions = [
  {
    title: "True or False: Do you need to write var in order to declare a variable? :",
    choices: ["True", "False"],
    answer: "False"
  },
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["head", "body", "header", "script"],
    answer: "script"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "True or False: we use HTML to customize the overall aesthetic of the webpage",
    choices: ["True", "False"],
    answer: "False"
  },
  {
    title:
      "How do you create a function in JavaScript?",
    choices: ["function = myFunction();", "function[functionName]", "function myFunction();", "console.Function()"],
    answer: "function myFunction();"
  }
];


function start() {

  timeLeft = 60 ;
  document.getElementById("timeLeft").innerHTML = timeLeft;

  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  next();
}


function endGame() {
  clearInterval(timer);

  // this will change the quizbody html content to a quick review of the questions you got right.
  var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score + ` /100!</h3>
    <h3>That means you got ` + score / 20 + ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}


function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById('name').value);
  getScore();
}


function getScore() {

 
  var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

  document.getElementById("quizBody").innerHTML = quizContent;
}


function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}


function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  //once the game is reset, this will set it back to the default start page the quiz had.
  var quizContent = `
   <div id="quiz">
		<div id="quizBody">
			<h1>
				Coding Quiz!
			</h1>
			<br>
			<br>
			<br>
			<h3>
				Click the START button to begin. (Please note, this is a timed quiz. Do your best.)
			</h3>
			<button onclick="start()">START</button>
		
		</div>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}


function incorrect() {
  timeLeft -= 15;
  next();
  feedbackEl.textContent = "Wrong!"; //couldnt get this to work
}


function correct() {
  score += 20;
  next();
  feedbackEl.textContent = "Correct!"; // this one either.

}


function next() {
  currentQuestion++;

  if (currentQuestion > questions.length - 1) {
    endGame();
    return;
  }

  var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

  for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
      buttonCode = buttonCode.replace("[ANS]", "incorrect()");
      
      
    }
    quizContent += buttonCode
  }


  document.getElementById("quizBody").innerHTML = quizContent;
}