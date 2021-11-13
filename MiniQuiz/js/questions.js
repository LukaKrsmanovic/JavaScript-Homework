// This will tell us which question it is
let count = 1;

let questions = [
    "What is the sum of 2 and 3?", 
    "What is the max value of f(x) = 7 + 4*sin(x)",
    "What is the positive square root of 100?", 
    "What is the square root of 25?",
    "What is the abbreviation for HTML?", 
    "What is AJAX short for?",
    "What is JSON shor for?",
    "On keyboard, what is key esc short for?",
    "Guess the element value: [5, 8, 11, ?]",
    "Guess the element value: [Q, W, E, ?]"
];

let totalQuestions = questions.length;

let posibbleAns = [
    ["The sum is: 5", "The sum is: 2", "The sum is: 9", "The sum is: 6"],
    ["Answer: 7", "Answer: 4", "Answer: 11", "Answer: 0"],
    ["Answer: 89", "Answer: 10.01", "Answer: 50", "Answer: 10"],
    ["Answer: 15", "Answer: -5", "Answer: |5|", "Answer: 5"],
    ["High Texture Multi Language", "Doesn't have abbreviation", "HyperText Markup Language", "HTML"],
    ["Doesn't have abbreviation", "Asynchronous JavaScript And XML", "Asynchronous Java and XML", "Analog JavaScript and XML"],
    ["Java School Of Notation", "JavaScript Object Notation", "Just Script Of Notations", "Doesn't have abbreviation"],
    ["Answer: Escort", "Answer: Escape", "Answer: Escalate", "Answer: Enter"],
    ["Answer: 12", "Answer: 14", "Answer: 18", "Answer: 15"],
    ["Answer: G", "Answer: T", "Answer: R", "Answer: F"]
];

let correctAns = [
    [0],
    [2],
    [3],
    [1, 2, 3],
    [2],
    [1],
    [1],
    [1],
    [1],
    [2]
];

let submitBtn = document.querySelector(".do-display input[type='submit']");

// This will store previous answers so that they don't appear again
let pastQuestions = [];

const questionNumber = document.querySelector(".box h2 span");
const questionTitle = document.querySelector(".box .question-part h3");

// This will give us all answer rows (children are 0 -> input and 1 -> label)
// answer has 6 elements becuase of single and multiple choices, so if the question
// has one answer it will be from 0 to 2, but for multiple will be from 3 to 5
const questionAnswers = document.querySelectorAll(".box .question-part .answer");

let qstIndex = Math.floor(Math.random() * totalQuestions);

setQuestion();

function setQuestion() {
    pastQuestions.push(qstIndex);

    questionNumber.textContent = count;
    questionTitle.textContent = questions[qstIndex];

    // correction variable will allow us to change ans values for multiple ans form
    let correction = 0;
    if(correctAns[qstIndex].length !== 1) {
        correction = 4;
        document.querySelectorAll(".box form")[0].className = "dont-display";
        document.querySelectorAll(".box form")[1].className = "do-display";
    } else {
        document.querySelectorAll(".box form")[0].className = "do-display";
        document.querySelectorAll(".box form")[1].className = "dont-display";
    }

    for(let i = 0; i < 4; i++) {
        questionAnswers[i+correction].children[1].textContent = posibbleAns[qstIndex][i];
    }

    submitBtn = document.querySelector(".do-display input[type='submit']");
    submitBtn.addEventListener("click", submitAnswer);
}

function submitAnswer() {
    let selectedAns = [];

    let correction = 0;
    if(correctAns[qstIndex].length !== 1) {
        correction = 4;
    }

    for(let i = 0; i < 4; i++) {
        if(questionAnswers[i+correction].children[0].checked) {
            selectedAns.push(i);
            questionAnswers[i+correction].children[0].checked = false;
        }
    }

    if(selectedAns.length === correctAns[qstIndex].length) {
        isCorreect = true;
        for(let i = 0; i < selectedAns.length; i++) {
            if(selectedAns[i] !== correctAns[qstIndex][i]) {
                isCorreect = false;
            }
        }
        if(isCorreect) {
            if(pastQuestions.length === totalQuestions) {
                victory();
            } else {
                count++;
                while(true) {
                    qstIndex = Math.floor(Math.random() * totalQuestions);
                    if(!(pastQuestions.includes(qstIndex))) {
                        break;
                    }
                }
                setQuestion();
            }
        } else {
            wrongAnswer();
        }
    } else {
        wrongAnswer();
    }
}

function wrongAnswer() {
    alert("Your answer was incorrect, you scored: " + (count-1) + " correct answers!\nTry again");
    location.reload();
}

function victory() {
    alert("Congratulations!\nYou have answered everything correctly!");
    location.href = "./index.html";
}