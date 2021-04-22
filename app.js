const screen = document.getElementById("screen");
let current = "",
  last = { type: "clear" },
  entries = [];

function handleEquals(btn) {
  entries.push(current)
  let solution = 0;
  if (entries[1] == '+') {
    solution = parseFloat(entries[0]) + parseFloat(entries[2]);
  } else if (entries[1] == '-') {
    solution = parseFloat(entries[0]) - parseFloat(entries[2]);
  } else if (entries[1] == 'X') {
    solution = parseFloat(entries[0]) * parseFloat(entries[2]);
  } else if (entries[1] == '/') {
    solution = parseFloat(entries[0]) / parseFloat(entries[2]);
  }
  last = btn;
  solution = Number(solution.toFixed(5))
  console.log(solution)
  entries = [solution]
  current = solution;
  if (solution.toString().length > 9) {
    handleLong();
  }
  screen.textContent = current;
}
function handleOps(ops) {
  entries.push(current);
  if (last = '=') { last = 0 }
  if (isNaN(+last)) {
    entries.splice(entries.length - 2, 2);
    entries.push(ops.value);
    current = "";
    last = ops
  } else {
    entries.push(ops.value);
    last = ops;
    current = "";
  }
  console.table(entries)
  screen.textContent = current;
}

function handleClear() {
  current = "";
  last = { type: "clear" };
  result = {};
  entries = [];
  screen.textContent = current;
}

function handleLong() {
  current = "Too Long"
  screen.textContent = current;
  setTimeout(() => {
    current = "";
    screen.textContent = current;
  }, 500);
}

function handleDec(dec) {
  if (parseFloat(current) % 1 == 0 && last.value != '.') {
    current = current + ".";
    last = dec;
  }
}

function handleNum(num) {
  let value = num.value;
  if (current == 0) {
    current = value;
    last = value;
  } else if (last == "=") {
    current = value;
    last = 0;
  } else {
    current = current + value;
    last = num;
  }
  if (current.length > 9) {
    handleLong();
  }

}

function handleClick(btn) {
  lastType = btn.name;
  if (btn.name == "ops") {
    handleOps(btn);
  } else if (btn.name == "num") {
    handleNum(btn);
  } else if (btn.name == "clear") {
    handleClear();
  } else if (btn.name == "equals") {
    handleEquals(btn);
  } else if (btn.name == "dec") {
    handleDec(btn);
  } else {
    console.log("error");
  }
  screen.textContent = current;
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach((b) => {
  b.addEventListener("click", (event) => {
    handleClick(event.target);
  });
});
