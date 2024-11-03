// List of words and their corresponding hints
let words = [
    { word: "javascript", hint: "Programming language often used for web development." },
    { word: "computer", hint: "An electronic device for processing data." },
    { word: "keyboard", hint: "Input device used for typing." },
    { word: "puzzle", hint: "A game or problem designed to test skill or knowledge." },
    { word: "monitor", hint: "A device used to display visual output." },
    { word: "internet", hint: "A global network connecting millions of devices." },
    { word: "syntax", hint: "Set of rules that defines the combinations of symbols in programming." },
    { word: "variable", hint: "A storage location paired with a symbolic name." },
    { word: "function", hint: "A block of organized, reusable code that performs a single action." },
    { word: "browser", hint: "Software application for accessing information on the internet." }
];

let currentWord, scrambledWord, timer;
const timeLimit = 30;
let score = 0;
let wordCount = 0;

// Function to shuffle letters in a word
function shuffle(word) {
    let shuffled = word.split("").sort(() => 0.5 - Math.random()).join("");
    while (shuffled === word) {
        shuffled = word.split("").sort(() => 0.5 - Math.random()).join("");
    }
    return shuffled;
}

// Function to start the game
function startGame() {
    if (wordCount === 10 || words.length === 0) {
        showResult(); // Show the result page after 10 words or if no words are left
        return;
    }

    // Select a random word and hint from the words array
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomObj = words[randomIndex];
    currentWord = randomObj.word;
    scrambledWord = shuffle(currentWord);

    // Update the UI with the scrambled word and hint
    document.querySelector(".word").textContent = scrambledWord;
    document.querySelector(".hint span").textContent = randomObj.hint;
    document.querySelector("input").value = ""; // Clear input field

    // Remove the used word from the array to avoid repetition
    words.splice(randomIndex, 1);

    // Reset and start the timer
    clearInterval(timer);
    let timeLeft = timeLimit;
    document.querySelector(".time b").textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.querySelector(".time b").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! The correct word was " + currentWord);
            wordCount++;
            startGame(); // Restart with the next word
        }
    }, 1000);
}

// Function to display the result page without restarting
function showResult() {
    // Clear the game content
    document.querySelector(".container").innerHTML = `
        <h2>Game Over</h2>
        <p>Your score: ${score} out of 10</p>
        <p>Thank you for playing!</p>
    `;
}

// Check the entered word against the correct word
document.querySelector(".check-word").addEventListener("click", () => {
    const userWord = document.querySelector("input").value.trim().toLowerCase();
    if (userWord === currentWord) {
        clearInterval(timer);
        alert("Congratulations! You guessed the correct word.");
        score++; // Increase score for correct answer
    } else {
        alert("Oops! The correct word was " + currentWord);
    }
    wordCount++; // Increase word count
    startGame(); // Start a new game
});

// Refresh button to get a new word
document.querySelector(".refresh-word").addEventListener("click", startGame);

// Start the first game on page load
window.addEventListener("load", startGame);
