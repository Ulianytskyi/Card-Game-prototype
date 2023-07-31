const startButton = document.getElementById("start-button");
const container = document.querySelector(".container");
const coverScreen = document.querySelector(".cover-screen");
const result = document.getElementById("result");
const overText = document.getElementById("over-text");

let healthPoint = 16;
let experience = 0;

// Функція для генерування масиву Cards з випадковими числами від min до max
function generateRandomArray(length, min, max) {
    const array = [];
    let objectType = 0;
    for (let i = 0; i < length; i++) {
        const randomType = getRandomNumber(1, 3);
        let name, number;

        switch (randomType) {
          case 1:
            name = 'potion';
            number = 5;
            break;
          case 2:
            name = 'armor';
            number = 3;
            break;
          case 3:
            name = 'enemy';
            number = getRandomNumber(5, 10);
            break;
        }

        array.push({ name, number });
    }
    return array;
}

// Функція для виведення масиву Cards на екран
function displayArray(array, targetElement) {
    targetElement.innerHTML = '';
    for (let i = 0; i < array.length; i++) {

        let objectClass = "object";
        let objectNameClass = "object-name";
        let objectNumberClass = "object-number";

        // Include the class in the HTML output
        targetElement.innerHTML += `<div class="${objectClass}">
            <span class="${objectNameClass}">${array[i].name}</span>
            <span class="${objectNumberClass}">${array[i].number}</span>
            </div>`;

        if ((i + 1) % 3 === 0) {
            targetElement.innerHTML += '<br>';
        }
    }
}

// Функція для генерування випадкового числа від min до max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Функція для копіювання чисел у масиви 2, 3 і 4
function copyNumbers(row, col) {
    if (row === 3) {
        if (col === 1) {
            array2.push(array1[6]);
        } else if (col === 2) {
            array2.push(array1[7]);
        } else if (col === 3) {
            array2.push(array1[8]);
        }
    }
    // Оновлення масиву Choosen cards
    displayArray(array2, document.getElementById('array2'));
    updatePlayerStatus();
}

// Початковий масив Cards з 9 випадковими числами від 1 до 3
let array1 = generateRandomArray(9, 1, 3);
const array1Element = document.getElementById('array1');
// Виведення початкового статусу гравця
displayArray(array1, array1Element);

// Початковий масив Chosen cards
let array2 = [];

// Функція для оновлення масиву Cards і виведення на екран
function updateArray1() {
    array1.splice(6, 3);
    const newNumbers = generateRandomArray(3, 1, 3);
    array1 = newNumbers.concat(array1);
    displayArray(array1, array1Element);
}

const gameOverCheck = () => {
  if (healthPoint < 0) {
    coverScreen.classList.remove("hide");
    container.classList.add("hide");
    overText.classList.remove("hide");
    result.innerText = `Final score: ${experience}`;
    startButton.innerText = "Restart Game";
    array2 = [];
    healthPoint = 16;
    experience = 0;
  }
};

// Функція для оновлення поля Характеристика гравця
function updatePlayerStatus() {
    const playerLifeElement = document.getElementById('player-healthPoint');
    const playerExperienceElement = document.getElementById('player-experience');

    // Calculate the current life and experience based on array2 content

    if (array2.length > 0) {

        const arrayLastIndex = array2[array2.length - 1];

        if (arrayLastIndex.name === 'potion') {
            healthPoint += arrayLastIndex.number;
            // Cap life at 16
            healthPoint = Math.min(healthPoint, 16);

            console.log('HP ' + healthPoint);

        } else if (arrayLastIndex.name === 'armor') {
            healthPoint += arrayLastIndex.number;

            console.log('Armor to HP ' + healthPoint);

        } else if (arrayLastIndex.name === 'enemy') {
            const damage = arrayLastIndex.number;
            healthPoint -= damage;
            experience = experience + (Math.ceil(damage / 100 * 25));

            console.log('ATTACK ' + damage + ' HP> ' + healthPoint);
        }

    }
    
    playerLifeElement.textContent = `HP: ${healthPoint}`;
    playerExperienceElement.textContent = `XP: ${experience}`;

    gameOverCheck();
}

// Функція для виведення масиву Chosen cards на екран
const array2Element = document.getElementById('array2');
displayArray(array2, array2Element);

// Функція для обробки натискання кнопок
const button1 = document.getElementById('button1');
button1.addEventListener('click', function() {
    copyNumbers(3, 1);
    updateArray1();
});

const button2 = document.getElementById('button2');
button2.addEventListener('click', function() {
    copyNumbers(3, 2);
    updateArray1();
});

const button3 = document.getElementById('button3');
button3.addEventListener('click', function() {
    copyNumbers(3, 3);
    updateArray1();
});

const startGame = () => {
    container.classList.remove("hide");
    coverScreen.classList.add("hide");
    updatePlayerStatus();
};

startButton.addEventListener("click", () => {
    startGame();
    document.body.style.overflow = "hidden";
});

    