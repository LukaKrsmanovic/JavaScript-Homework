const leftArrow = document.querySelector(".controls i:nth-child(1)");
leftArrow.addEventListener("click", mouseClick);

const rightArrow = document.querySelector(".controls i:nth-child(2)");
rightArrow.addEventListener("click", mouseClick);

const closeBtn = document.querySelector(".controls i:nth-child(3)");
closeBtn.addEventListener("click", closeImgView);

const imgSection = document.querySelector("section");
imgSection.addEventListener("click", openImgView);
imgSection.addEventListener("mouseenter", keyListen);
imgSection.addEventListener("mouseleave", keyListen);

function mouseClick(e) {
    if(e.target.className.includes("left")) {
        slideNext("left");
    } else {
        slideNext("right");
    }
}

function keyListen(e) {
    if(e.type === "mouseenter") {
        document.querySelector("body").addEventListener("keyup", keyPressed);
    } else if(e.type === "mouseleave") {
        document.querySelector("body").removeEventListener("keyup", keyPressed);
    }
}

function keyPressed(e) {
    if(e.keyCode === 37) {
        slideNext("left");
    } else if(e.keyCode === 39) {
        slideNext("right");
    }
}

function slideNext(direction) {
    const image = document.getElementById("image");

    // we want to get the first image number so that we can decide which is next
    // first we take the whole url and only take sub string that is the image name
    let currentImg = image.src.substring(image.src.lastIndexOf("/")+1, image.src.length);

    // then we remove img from beginning so that parseInt can give us number
    // (string has to start with number for it to work)
    currentImg = currentImg.replace("img", "");
    currentImg = parseInt(currentImg);

    if(direction === "left" && currentImg !== 1) {
        currentImg--;
    } else if(direction === "right" && currentImg !== 5) {
        currentImg++;
    }
    image.src = "./images/img" + currentImg + ".png";
}

function openImgView(e) {
    if(e.target.tagName === "DIV") {
        imgSection.style.width = "90%";
        imgSection.style.height = "90%";
        closeBtn.style.display = "flex";
    }
}

function closeImgView() {
    closeBtn.style.display = "none";
    imgSection.style.width = "500px";
    imgSection.style.height = "300px";
}