const colorCombinations = [
    { colors: ['red', 'yellow'], result: 'orange' },
    { colors: ['yellow', 'blue'], result: 'green' },
    { colors: ['red', 'blue'], result: 'purple' },
    { colors: ['green', 'yellow'], result: 'lime' },
    { colors: ['red', 'green'], result: 'brown' },
    { colors: ['blue', 'purple'], result: 'indigo' },
    // Add more color combinations here
];

const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const colorOptions = document.querySelector('.options');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');

let currentCombination;
let score = 0;

const availableColors = ['red', 'yellow', 'blue', 'green', 'purple', 'orange', 'lime', 'brown', 'indigo'];

function startRound() {
    const randomIndex = Math.floor(Math.random() * colorCombinations.length);
    currentCombination = colorCombinations[randomIndex];

    color1.style.backgroundColor = currentCombination.colors[0];
    color2.style.backgroundColor = currentCombination.colors[1];

    colorOptions.innerHTML = ''; // Clear existing options

    // Generate and append color options dynamically
    for (let i = 0; i < 3; i++) {
        const option = document.createElement('button');
        option.classList.add('color-option');
        const randomColor = getRandomColor();
        option.id = randomColor;
        option.textContent = randomColor;
        colorOptions.appendChild(option);
    }

    // Assign the correct result color to one of the options
    const correctOptionIndex = Math.floor(Math.random() * 3);
    colorOptions.children[correctOptionIndex].id = currentCombination.result;
    colorOptions.children[correctOptionIndex].textContent = currentCombination.result;

    for (const option of colorOptions.children) {
        option.addEventListener('click', handleOptionClick);
    }
}

function handleOptionClick(event) {
    const selectedColor = event.target.id;
    const correctColor = currentCombination.result;

    if (selectedColor === correctColor) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        message.textContent = 'Great job! You made the right color!';
        message.style.color = 'green';
    } else {
        message.textContent = 'Oops! That\'s not the right color. Try again!';
        message.style.color = 'red';
    }

    for (const option of colorOptions.children) {
        option.removeEventListener('click', handleOptionClick);
    }

    setTimeout(() => {
        message.textContent = '';
        message.style.color = '';
        startRound();
    }, 2000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
}

startRound();
