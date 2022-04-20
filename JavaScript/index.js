// el(s) = elemento(s)

const elsNumberBtn = document.getElementsByClassName("number-btn"),
  elsOperationBtn = document.getElementsByClassName("operation-btn"),
  elViewInput = document.getElementById("view-input"),
  elEqualBtn = document.getElementById("equal-btn"),
  elClearBtn = document.getElementById("clear-btn"),
  elPeriodBtn = document.getElementById("period-btn"),
  elValueOne = document.getElementById("value-one"),
  elOperation = document.getElementById("operation"),
  elValueTwo = document.getElementById("value-two"),
  elErrorMsg = document.getElementById("error-msg"),
  elResult = document.getElementById("result"),
  elRefreshBtn = document.getElementById("refresh-btn");

const numbersText = "0123456789";

let hasPeriod = false,
  afterPeriod = false,
  isValid,
  indexOfPeriod,
  newViewInput,
  result;

function addEventListenerToClass(elsClass, event, func) {
  let elsClassLength = elsClass.length;
  for (let i = 0; i < elsClassLength; i++) {
    elsClass[i].addEventListener(event, func);
  }
}

function setStyleToClass(elsClass, styleAtributte, atributteValue) {
  let elsClassLength = elsClass.length;
  for (let i = 0; i < elsClassLength; i++) {
    elsClass[i].style[styleAtributte] = atributteValue;
  }
}

function elErrorMsgAppear() {
  elErrorMsg.style.filter = "opacity(100%)";
  elErrorMsg.style.marginTop = "10px";
}

function elErrorMsgDisappear() {
  elErrorMsg.style.filter = "opacity(0%)";
  elErrorMsg.style.marginTop = "-10px";
}

function putOnViewInput() {
  if (hasPeriod && !afterPeriod) {
    indexOfPeriod = elViewInput.value.indexOf(".");
    newViewInput = elViewInput.value.slice(0, indexOfPeriod);
    elViewInput.value = `${newViewInput}.${this.textContent}`;
    afterPeriod = true;
  } else {
    elViewInput.value += this.textContent;
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
    // espera até que seja posto o character
    // no elViewInput e só então o altera
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

function validate() {
  if (elViewInput.value == "") {
    elErrorMsg.textContent = "ERROR: Primeiramente adicione algum valor.";
    elErrorMsgAppear();
    isValid = false;
  } else {
    isValid = true;
  }
}

function setOperation() {
  validate();
  if (isValid) {
    if (elValueOne.textContent == "") {
      elErrorMsgDisappear();
      elValueOne.textContent = elViewInput.value;
      elOperation.textContent = this.textContent;
      setStyleToClass(elsOperationBtn, "filter", "grayscale(100%)");
      setStyleToClass(elsOperationBtn, "cursor", "not-allowed");
      clearViewInput();
    } else {
      elErrorMsg.textContent = "ERROR: Operação matemática já foi aplicada.";
      elErrorMsgAppear();
    }
  }
}

function putResult() {
  validate();
  if (isValid) {
    if (elValueOne.textContent != "" && elValueTwo.textContent == "") {
      elErrorMsgDisappear();
      elValueTwo.textContent = elViewInput.value;

      switch (elOperation.textContent) {
        case "+":
          result =
            parseFloat(elValueOne.textContent) +
            parseFloat(elValueTwo.textContent);
          break;

        case "-":
          result =
            parseFloat(elValueOne.textContent) -
            parseFloat(elValueTwo.textContent);
          break;

        case "x":
          result =
            parseFloat(elValueOne.textContent) *
            parseFloat(elValueTwo.textContent);
          break;

        case "÷":
          result =
            parseFloat(elValueOne.textContent) /
            parseFloat(elValueTwo.textContent);
          break;

        default:
          break;
      }
      elResult.textContent = result.toFixed(2);
      elEqualBtn.style.filter = "grayscale(100%)";
      elEqualBtn.style.cursor = "not-allowed";
      clearViewInput();
    } else if (elValueOne.textContent == "") {
      elErrorMsg.textContent = "ERROR: Antes escolha uma operação matemática.";
      elErrorMsgAppear();
    } else {
      elErrorMsg.textContent =
        "ERROR: O cálculo já foi realizado, recarregue a página.";
      elErrorMsgAppear();
    }
  }
}

addEventListenerToClass(elsNumberBtn, "click", putOnViewInput);
addEventListenerToClass(elsOperationBtn, "click", setOperation);
elEqualBtn.addEventListener("click", putResult);
elClearBtn.addEventListener("click", clearViewInput);
elPeriodBtn.addEventListener("click", addPeriod);
elViewInput.addEventListener("keydown", pressCharacter);
elRefreshBtn.addEventListener("click", () => {
  document.location.reload(true);
});
