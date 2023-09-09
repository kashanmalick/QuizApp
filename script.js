const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    }, {
        question: "What is the capital of Pakistan?",
        options: ["Karachi", "Islamabad", "Lahore", "Queeta"],
        answer: "Islamabad"
    }, {
        question: "What is the Most Populer Leader of Pakistan?",
        options: ["Nawaz Shareef", "Asif Zardari", "Molana Fazlul Rehman", "Imran Khan"],
        answer: "Imran Khan"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer; // Timer variable
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next-button");
const quizContainer = document.getElementById("quiz-container");
const finalScoreCard = document.getElementById("final-score-card");
const finalScoreElement = document.getElementById("final-score");
const totalQuestionsElement = document.getElementById("total-questions");
const retryButton = document.getElementById("retry-button");
const nameInputContainer = document.getElementById("name-input-container");
const nameInput = document.getElementById("name");
const startButton = document.getElementById("start-button");
const userNameElement = document.getElementById("user-name");

// Hide the quiz and final score card initially
quizContainer.style.display = "none";
finalScoreCard.style.display = "none";

startButton.addEventListener("click", () => {
    const userName = nameInput.value.trim();
    if (userName === "") {
        // alert("Please enter your name to start the quiz.");
        swal("Quiz Requirement", "Please Enter your Name to start the quiz.", "error");
    } else {
        userNameElement.textContent = userName;
        nameInputContainer.style.display = "none"; // Hide the name input container
        quizContainer.style.display = "block"; // Show the quiz container
        showQuestion();
        
    }
});

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.addEventListener("click", () => checkAnswer(option, currentQuestion.answer));
        optionsElement.appendChild(optionButton);
    });
    startTimer()
}

function startTimer() {
    let timeLeft = 10; // Time in seconds for each question
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer(null, null); // Time's up
        }
    }, 1000);
}


function showFinalScore() {
    finalScoreElement.textContent = score;
    totalQuestionsElement.textContent = questions.length;
    finalScoreCard.style.display = "block";
    quizContainer.style.display = "none"; // Hide the quiz view
    retryButton.addEventListener("click", retryQuiz);
}

function retryQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = "0";
    finalScoreCard.style.display = "none"; // Hide the final score card
    quizContainer.style.display = "block"; // Show the quiz view
    retryButton.style.display = "none"; // Hide the "Retry" button
    nextButton.disabled = false;
    showQuestion();
    startTimer();
}

function checkAnswer(selectedOption, correctAnswer) {
    clearInterval(timer); // Stop the timer

    if (selectedOption === correctAnswer) {
        score++;
        scoreElement.textContent = score;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalScore(); // Display the final score card
        nextButton.disabled = true;
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
});