const cards = document.querySelectorAll(".flip");
const memoWrap = document.querySelectorAll(".memoWrap");
const startScreen = document.querySelector(".startScreen");
const time = document.querySelector(".time");
const startText = document.querySelector(".startText");
const endText = document.querySelector(".endText");
const gg = document.querySelector(".gg");

(function shuffle() {
  memoWrap.forEach((memo) => {
    let randPos = Math.floor(Math.random() * memoWrap.length);
    memo.style.order = randPos;
  });
})();
let flipped = false;
let lockGame = false;
let countTime,
  seconds = 59,
  score = 0,
  firstMemo,
  secondMemo;

function flipMemo() {
  if (lockGame) return;
  if (this === firstMemo) return;
  this.classList.toggle("flipRotate");

  if (!flipped) {
    flipped = true;
    firstMemo = this;
    return;
  } else {
    secondMemo = this;
    if (firstMemo.dataset.name === secondMemo.dataset.name) {
      firstMemo.removeEventListener("click", flipMemo);
      secondMemo.removeEventListener("click", flipMemo);
      score++;
      resetBoard();
    } else {
      lockGame = true;
      setTimeout(() => {
        firstMemo.classList.remove("flipRotate");
        secondMemo.classList.remove("flipRotate");
        resetBoard();
      }, 1000);
    }
  }
}
function resetBoard() {
  [flipped, lockGame] = [false, false];
  [firstMemo, secondMemo] = [null, null];
}
const handleStart = () => {
  clearInterval(countTime);
  countTime = setInterval(() => {
    if (seconds <= 59 && seconds > 10 && score < 8) {
      seconds--;
      time.textContent = `00:${seconds}`;
    } else if (seconds <= 10 && seconds > 0 && score < 8) {
      seconds--;
      time.textContent = `00:0${seconds}`;
    } else if (score === 8 && seconds > 0) {
      startScreen.style.display = "block";
      gg.style.display = "block";
      startText.textContent = `You score ${score} in ${59 - seconds} seconds`;
      endText.textContent = `Click to restart `;
      clearInterval(countTime);
      startScreen.addEventListener("click", () => {
        window.location.reload(false);
      });
    } else {
      time.textContent = `00:00`;
      startScreen.style.display = "block";
      gg.style.display = "block";
      startText.textContent = `Your score was ${score}`;
      endText.textContent = `Click to restart `;
      clearInterval(countTime);
      startScreen.addEventListener("click", () => {
        window.location.reload(false);
      });
    }
  }, 1000);
};
startScreen.addEventListener("click", () => {
  startScreen.style.display = "none";
  if (seconds === 0) {
    return;
  } else {
    handleStart();
  }
});

cards.forEach((el) => el.addEventListener("click", flipMemo));
