const doorEls = document.querySelectorAll(".door-frame");
const startButton = document.querySelector("#start");
function closeDoor() {
  return "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
}
function showChoreBot() {
  return "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
}
function showBeach() {
  return "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
}
function showSpace() {
  return "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
}
let numClosedDoors = 3;
window.openDoor1, window.openDoor2, window.openDoor3;
let currentlyPlaying = true;

const isClicked = door => {
  return door.src != closeDoor();
}
const isBot = door => {
  return door.src == showChoreBot();
}

const playDoor = door => {
  numClosedDoors--; 
  if (numClosedDoors === 0) {
    gameOver('win');
  }
  else if (isBot(door)) {
    gameOver('lose');
  }
}

const randomChoreDoorGenerator = () => {
  const choreDoor = Math.round(Math.random() * 2);
  switch (choreDoor) {
    case 0:
      openDoor1 = showChoreBot();
      openDoor2 = showBeach();
      openDoor3 = showSpace();
      break;
    case 1:
      openDoor2 = showChoreBot();
      openDoor3 = showBeach();
      openDoor1 = showSpace();
      break;
    case 2:
      openDoor3 = showChoreBot();
      openDoor1 = showBeach();
      openDoor2 = showSpace();
      break;
  }
}
doorEls.forEach((doorEl, index) => {
  doorEl.onclick = function() {
    if(!isClicked(this) && currentlyPlaying) {
      this.src = window['openDoor' + (1 + index).toString()]
      playDoor(this);
    }
  }
});

startButton.onclick = () => {
 	startRound();
}

function gameOver(str) {
  if (str === "win") startButton.innerHTML = "You win! Play again?";
  else startButton.innerHTML = "Game Over! Play again?";
  currentlyPlaying = false;
}
function startRound() {
  doorEls.forEach(doorEl => doorEl.src = closeDoor());
  numClosedDoors = 3;
  startButton.innerHTML = "Good Luck!";
  currentlyPlaying = true;
  randomChoreDoorGenerator(); // Get random door number of each thing behind door (image)
}

const getYourScore = () => {
  score++;
  currentStreak.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
}

startRound();