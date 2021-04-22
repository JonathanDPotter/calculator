const currentDisplay = document.getElementById("current"),
  entriesDisplay = document.getElementById("entries");

let current = "",
  last = { type: "clear" },
  entries = [];

function handleEquals(btn) {
  if (entries.length < 2) {
    return;
  }
  entries.push(current);
  console.table(entries);
  let solution;
  console.log(entries[1]);
  if (entries[1] == "+") {
    solution = parseFloat(entries[0]) + parseFloat(entries[2]);
  } else if (entries[1] == "-") {
    solution = parseFloat(entries[0]) - parseFloat(entries[2]);
  } else if (entries[1] == "X") {
    solution = parseFloat(entries[0]) * parseFloat(entries[2]);
  } else if (entries[1] == "/") {
    solution = parseFloat(entries[0]) / parseFloat(entries[2]);
  }
  handleClear();
  last = btn;
  solution = Number(solution.toFixed(5));
  current = solution;
  if (solution.toString().length > 14) {
    handleLong();
  }
  currentDisplay.textContent = current;
  entriesDisplay.textContent = "";
}

function handleOps(ops) {
  if (entries.length > 2) {
    return;
  }
  entries.push(current);
  if (last.name == "equals") {
    last.name = "num";
    entries = [current];
  }
  if (last.name == "ops") {
    entries.splice(entries[1]);
    current = "";
    last = ops;
  } else {
    entries.push(ops.value);
    last = ops;
    current = "";
  }
  currentDisplay.textContent = "";
  entriesDisplay.textContent = entries.join(" ");
}

function handleClear() {
  current = "";
  last = { type: "clear" };
  result = {};
  entries = [];
  currentDisplay.textContent = current;
  entriesDisplay.textContent = "";
}

function handleLong() {
  current = "Too Long";
  currentDisplay.textContent = current;
  setTimeout(() => {
    current = "";
    currentDisplay.textContent = current;
    entriesDisplay.textContent = "";
  }, 500);
}

function handleDec(dec) {
  if (parseFloat(current) % 1 == 0 && last.value != ".") {
    console.log(parseFloat(current));
    current = current + ".";
    last = dec;
  }
  currentDisplay.textContent = current;
  entriesDisplay.textContent = entries.join(" ");
}

function handleNum(num) {
  let value = num.value;
  if (current == 0) {
    current = value;
    last = num;
  } else if (last.value == "=") {
    current = value;
    last = num;
  } else {
    current = current + value;
    last = num;
  }
  if (current.length > 14) {
    handleLong();
  }
  currentDisplay.textContent = current;
  entriesDisplay.textContent = entries.join(" ");
}

function handleClick(btn) {
  console.log(btn.dataset.type, btn.value);
  lastType = btn.dataset.type;
  if (btn.dataset.type === "ops") {
    handleOps(btn);
  } else if (btn.dataset.type === "clear") {
    handleClear();
  } else if (btn.dataset.type === "equals") {
    handleEquals(btn);
  } else if (btn.dataset.type === "num") {
    handleNum(btn);
  } else if (btn.dataset.type === "dec") {
    handleDec(btn);
  } else {
    console.log(btn.dataset.type);
  }
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach((b) => {
  b.addEventListener("click", (event) => {
    handleClick(event.target);
  });
});
