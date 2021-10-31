// div element that will cointain ul with li of possible results from input
const possibleResults = document.getElementById("possible-results");
possibleResults.addEventListener("mouseover", mouseEvent);
possibleResults.addEventListener("mouseout", mouseEvent);
possibleResults.addEventListener("keyup", pritisak);

// ul element containning ToDo list
const ulToDo = document.querySelector("ul.list-group");

// Creating same list for possible results (in css all li are display: none)
possibleResults.appendChild(ulToDo.cloneNode(true));
const liResults = possibleResults.firstElementChild.children;

liResults[0].parentNode.addEventListener("click", mouseClicked);

//Input element and its events
const input = document.querySelector("input[type=text]");
input.addEventListener("keyup", pritisak);
input.addEventListener("focus", listShow);
input.addEventListener("focusout", listShow);

// Varibles to help check if mouse is over results 
// or focus is on results but not focused on input
var mOverResults = false;
var mFocusInput = false;

function mouseEvent(e) {
    if(e.type == "mouseover") {
        mOverResults = true;
    } else {
        mOverResults = false;
    }
    showResults();
}

function listShow(e) {
    if(e.type === "focus") {
        mFocusInput = true;
        firstTimePressed = true;
    } else {
        mFocusInput = false;
    }
    showResults();
}

function showResults() {
    if(mFocusInput) {
        possibleResults.style.display = "block";
    } else if(!mOverResults && focusIndex === -1) {
        possibleResults.style.display = "none";
    }
}

function pritisak(e) {
    if([13, 37, 38, 39, 40].includes(e.keyCode)) {
        if(possibleLength !== 0) { checkFocusElement(e.keyCode); }
    } else {
        checkResultsToShow(liResults, e.target.value.toLowerCase());
    }
}

var focusIndex = -1, possibleLength = 0, firstTimePressed = true;
var listIndexArray = [];

function checkFocusElement(direction) {
    /* Direction codes:
        13 - enter
        37 - left
        38 - up
        39 - right
        40 - down
    */
    switch(direction) {
        case 13:
            fillInput(liResults[listIndexArray[focusIndex]].textContent);
            break;
        case 37:
            // code block
            break;
        case 38:
            focusIndex--;
            break;
        case 39:
            // code block
            break;
        case 40:
            focusIndex++;
            break;
        default:
            // code block
    }
    if(firstTimePressed) {
        focusIndex = 0;
        firstTimePressed = false;
    } 
    else if(focusIndex < 0) { 
        focusIndex = possibleLength-1;
    } 
    else if(focusIndex > possibleLength-1) { 
        focusIndex = 0; 
    }
    liResults[listIndexArray[focusIndex]].focus();
    console.log(listIndexArray[focusIndex]);
}

function checkResultsToShow(list, inputVal) {
    possibleLength = 0;
    listIndexArray = [];
    for(let i = 0; i < list.length; i++) {
        // All guilty 'till proven wrong
        list[i].style.display = "none";
        if(list[i].textContent.toLowerCase().indexOf(inputVal) == 0 && inputVal.length != 0)
        {
            list[i].style.display = "block";
            possibleLength++;
            listIndexArray.push(i);
        }
    }
}

function mouseClicked(e) {
    fillInput(e.target.textContent);
}

function fillInput(val) {
    focusIndex = -1;
    input.value = val;
    //Letting possible results know there is new value in input
    checkResultsToShow(liResults, val.toLowerCase());
    //ToDo list to only show the result
    checkResultsToShow(ulToDo.children, val.toLowerCase());
    //Possible results dissapear when clicked (not needed)
    mOverResults = false;
    showResults();
}