// el(s): elemento(s)

const elsNumberBtn = document.getElementsByClassName("number-btn"),
  elViewInput = document.getElementById("view-input"),
  elClearBtn = document.getElementById("clear-btn"),
  elPeriodBtn = document.getElementById("period-btn");

let hasPeriod = false,
  afterPeriod = false;

function addEventListenerToClass(elsClass, event, func) {
  for (let i = 0; i < elsClass.length; i++) {
    elsClass[i].addEventListener(event, func);
  }
}

function putOnViewInput() {
  if (hasPeriod && !afterPeriod) {
    let i = elViewInput.value.lastIndexOf(".0");
    let newViewInput = elViewInput.value.slice(0, i);
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

// Consertar quando aperta . ou ,
function keyy(keys) {
  console.log(keys.key);
  if ((keys.key == "." || keys.key == ",") && !hasPeriod) {
    console.log("foi");
  }
}

addEventListenerToClass(elsNumberBtn, "click", putOnViewInput);
elClearBtn.addEventListener("click", clearViewInput);
elPeriodBtn.addEventListener("click", addPeriod);

elViewInput.addEventListener("keypress", keyy);
