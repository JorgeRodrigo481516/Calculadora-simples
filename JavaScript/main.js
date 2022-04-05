// el(s): elemento(s)

const elsNumberBtn = document.getElementsByClassName("number-btn"),
  elViewInput = document.getElementById("view-input"),
  elClearBtn = document.getElementById("clear-btn"),
  elPeriodBtn = document.getElementById("period-btn");

const numbersText = "0123456789";

let hasPeriod = false,
  afterPeriod = false,
  indexOfPeriod,
  newViewInput;

function addEventListenerToClass(elsClass, event, func) {
  let elsClassLength = elsClass.length;
  for (let i = 0; i < elsClassLength; i++) {
    elsClass[i].addEventListener(event, func);
  }
}

function putOnViewInput() {
  if (hasPeriod && !afterPeriod) {
    indexOfPeriod = elViewInput.value.indexOf(".");
    newViewInput = elViewInput.value.slice(0, indexOfPeriod);
    elViewInput.value = `${newViewInput}.${this.innerHTML}`;
    afterPeriod = true;
  } else {
    elViewInput.value += this.innerHTML;
  }
}

function clearViewInput() {
  elViewInput.value = "";
  hasPeriod = false;
  afterPeriod = false;
}

function addPeriod() {
  if (!hasPeriod) {
    elViewInput.value += ".0";
    hasPeriod = true;
  }
}

function pressCharacter(char) {
  if ((char.key == "." || char.key == ",") && !hasPeriod) {
    elViewInput.value += ".0";
    hasPeriod = true;
  }
  if (hasPeriod && !afterPeriod) {
    // espera que seja posto o character no elViewInput
    // e só então o altera
    setTimeout(() => {
      indexOfPeriod = elViewInput.value.indexOf(".");
      newViewInput = elViewInput.value.slice(0, indexOfPeriod);
      if (numbersText.includes(char.key)) {
        elViewInput.value = `${newViewInput}.${char.key}`;
        afterPeriod = true;
      }
    }, 60);
  }
  char.key == "Backspace" ? clearViewInput() : console.log(char.key);
}

addEventListenerToClass(elsNumberBtn, "click", putOnViewInput);
elClearBtn.addEventListener("click", clearViewInput);
elPeriodBtn.addEventListener("click", addPeriod);
elViewInput.addEventListener("keydown", pressCharacter);
