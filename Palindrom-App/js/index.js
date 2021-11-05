let number = 5;

(function (){
    let input = prompt("Unesite broj kvadratića:", "5");
    for(let i = 0; i < input.length; i++) {
        if(!(input[i] >= '0' && input[i] <= '9')) {
            location.reload();
        }
    }
    number = parseInt(input);
    if(number < 1) {
        number = 1;
    }
})()

const boxItem = document.querySelector("main .box");
const boxContainer = document.querySelector("main .container");
let inputField = document.querySelectorAll("main .box input");
createBox();

function createBox() {
    for(let i = 0; i < number-1; i++) {
        boxContainer.appendChild(boxItem.cloneNode(true));
    }
    inputField = document.querySelectorAll("main .box input");
    const deleteButton = document.querySelectorAll(".box i");
    for(let i = 0; i < number; i++) {
        inputField[i].addEventListener("keyup", checkPressed);
        deleteButton[i].addEventListener("click", deleteElement);
    }
}

const addButton = document.querySelector("button");
addButton.addEventListener("click", addElement);

function addElement() {
    boxContainer.appendChild(boxItem.cloneNode(true));
    inputField = document.querySelectorAll("main .box input");
    inputField[number].value = "";
    inputField[number].addEventListener("keyup", checkPressed);
    const deleteButton = document.querySelectorAll(".box i");
    deleteButton[number++].addEventListener("click", deleteElement);
}

function deleteElement(e) {
    if(number > 1) {
        e.target.parentNode.remove();
        number--;
        inputField = document.querySelectorAll("main .box input");
        checkString();
    }
}

function checkPressed(e) {
    // 16 is shift, 32 is space
    let allowedArr = [8, 9, 16, 32];
    // 65 to 90 are letters
    for(let i = 65; i <= 90; i++) {
        allowedArr.push(i);
    }
    if(allowedArr.includes(e.keyCode)) {
         checkString();
    }
}

function checkString() {
    const title = document.getElementById("word-indicator");
    title.textContent = "nije";
    title.style.color = "red";
    let word = "";
    for(let i = 0; i < number; i++) {
        word += inputField[i].value;
    }
    if(word.length > 2 && word.length % 2 != 0) {
        let isPalindrom = true;
        for(let i = 0; i < parseInt(word.length/2); i++) {
            if(word[i] !== word[word.length-1-i]) {
                isPalindrom = false;
                break;
            }
        }
        if(isPalindrom) {
            title.textContent = "jeste";
            title.style.color = "green";
        }
    }
    
}