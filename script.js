const boxContainer = document.querySelector(".box-container");
const boxs = document.querySelectorAll(".box");
const players = document.querySelectorAll(".player");
const button = document.querySelector("button");
const score = document.querySelectorAll(".score");

let turn = "X";
const winPatterns = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9],
];

const resetStyle = function () {
  players[0].style.opacity = 0.5;
  players[1].style.opacity = 0.5;
  players[2].style.opacity = 0.5;
};

const winRatio = [0, 0, 0];

let matchFinished = false;
players[0].style.opacity = 1;

const changeTurn = () => {
  if (!matchFinished) {
    turn = turn === "X" ? "O" : "X";
    players.forEach((player) => (player.style.opacity = 0.5));

    if (turn === "X") players[0].style.opacity = 1;
    else if (turn === "O") players[2].style.opacity = 1;
  } else {
    winRatio.forEach((value, index) => (score[index].textContent = value));
  }
};

function checkWin() {
  const gameTie = checkTie();
  if (!gameTie) {
    let xWin, oWin;

    for (let pattern of winPatterns) {
      xWin = pattern.every((value) => boxs[value - 1].textContent === "X");
      oWin = pattern.every((value) => boxs[value - 1].textContent === "O");

      if (xWin || oWin) {
        new Audio("./win.wav").play();
        resetStyle();
        matchFinished = true;
        break;
      }
    }

    if (xWin) {
      players[0].style.opacity = 1;
      winRatio[0]++;
    } else if (oWin) {
      players[2].style.opacity = 1;
      winRatio[2]++;
    }
  }
}

function checkTie() {
  const data = Array.from(boxs).every(
    (box) => box.textContent === "X" || box.textContent === "O"
  );
  if (data) {
    resetStyle();
    new Audio("./tie.mp3").play();
    players[1].style.opacity = 1;
    winRatio[1]++;
    matchFinished = true;
  }
  return data;
}

boxContainer.addEventListener("click", function (e) {
  if (
    matchFinished ||
    e.target.textContent === "X" ||
    e.target.textContent === "O"
  )
    return;
  new Audio("./ting.mp3").play();
  e.target.textContent = turn;
  checkWin();
  changeTurn();
});

button.addEventListener("click", function () {
  boxs.forEach((box) => (box.textContent = ""));
  turn = "X";
  players[0].style.opacity = 1;
  players[1].style.opacity = 0.5;
  players[2].style.opacity = 0.5;
  matchFinished = false;
});
