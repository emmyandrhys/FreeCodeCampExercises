const timer = {
  session: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
  running: false,
  remainingTime: { total: 1500, minutes: 25, seconds: 0 },
  mode: "session",
};


/* Break Length Adjustment Listeners and Functions */
const bDec = document.getElementById("break-decrement");
const bInc = document.getElementById("break-increment");
const breakLabel = document.getElementById("break-length");
function breakAdjust(e) {
  let value = Number(e.target.value);
  if (timer.shortBreak > 1 && timer.shortBreak < 60) {
    timer.shortBreak = timer.shortBreak + value;
    bDec.disabled = false;
    bInc.disabled = false;
  }
  if (timer.shortBreak <= 1) {
    bDec.disabled = true;
  }
  if (timer.shortBreak >= 60) {
    bInc.disabled = true;
  }
  const time = `${timer.shortBreak}`;
  breakLabel.textContent = `${time}`;
}
bInc.addEventListener("click", breakAdjust);
bDec.addEventListener("click", breakAdjust);

/* Session Length Adjustment Listeners and Functions */
const sDec = document.getElementById("session-decrement");
const sInc = document.getElementById("session-increment");
const sessionLabel = document.getElementById("session-length");

function sessionAdjust(e) {
  let value = Number(e.target.value);
  if (timer.shortBreak > 1 && timer.shortBreak < 60) {
    timer.session = timer.session + value;
    sDec.disabled = false;
    sInc.disabled = false;
  }
  if (timer.session <= 1) {
    sDec.disabled = true;
  }
  if (timer.session >= 60) {
    sInc.disabled = true;
  }
  const time = `${timer.session}`;
  sessionLabel.textContent = `${time}`;
}
sInc.addEventListener("click", sessionAdjust);
sDec.addEventListener("click", sessionAdjust);

let interval;

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = parseInt(difference / 1000);
  const minutes = parseInt((total / 60) % 60);
  const seconds = parseInt(total % 60);

  return {
    total,
    minutes,
    seconds,
  };
}
const timeLeft = document.getElementById("time-left");
function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, "0");
  const seconds = `${remainingTime.seconds}`.padStart(2, "0");

  const time = `${minutes}:${seconds}`;
  timeLeft.textContent = time;

  document.title = `${time} - ${timer.mode}`;
  const progress = document.getElementById("js-progress");
  progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
}

function startTimer() {
  let total = timer.remainingTime.total;
  const endTime = Date.parse(new Date()) + total * 1000;

  if (timer.mode === "session") timer.sessions++;
  mainButton.textContent = "Pause";
  timer.running = true;
  timer.remainingTime = getRemainingTime(endTime);
  total = timer.remainingTime.total;
  interval = setTimeout(total) => {
  setTimeout(function () {
    updateClock();


    if (total <= 0) {
      clearTimeout(interval);

      switch (timer.mode) {
        case "session":
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode("longBreak");
          } else {
            switchMode("shortBreak");
          }
          break;
        default:
          switchMode("session");
      }

      if (Notification.permission === "granted") {
        const text =
          timer.mode === "session" ? "Get back to work!" : "Take a break!";
        new Notification(text);
      }
      document.getElementById('beep').play();
     // document.querySelector(`[data-sound="${timer.mode}"]`).play();
      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearTimeout(interval);
  mainButton.textContent = "Start";
  timer.running = false;
}

function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };

  document
    .querySelectorAll(".modebutton[data-mode]")
    .forEach((e) => e.classList.remove("active"));
  document.querySelector(`[data-mode="${mode}"]`).classList.add("active");
  document
    .getElementById("js-progress")
    .setAttribute("max", timer.remainingTime.total);
  document.body.style.backgroundColor = `var(--${mode})`;
  document.getElementById("timer-label").textContent = `${mode}`;

  updateClock();
}

function handleMode(event) {
  const { mode } = event.target.dataset;

  if (!mode) return;

  timer.sessions = 0;
  switchMode(mode);
  stopTimer();
}

const buttonSound = new Audio("button-sound.mp3");
const mainButton = document.getElementById("start_stop");
mainButton.addEventListener("click", () => {
  buttonSound.play();
  if (!timer.running) {
    startTimer();
  } else {
    stopTimer();
  }
});

const modeButtons = document.querySelectorAll(".modebutton");
modeButtons.forEach((modebutton) =>
  modebutton.addEventListener("click", handleMode)
);

document.addEventListener("DOMContentLoaded", () => {
  if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification(
          "Awesome! You will receive notifications at the start of a Session or a break"
        );
      }
    });
  }
  switchMode("session");
});

function resetTimer() {
  if (timer.running) {
    stopTimer();
  }
  timer.session = 25;
  timer.shortBreak = 5;
  timer.longBreak = 15;
  timer.longBreakInterval = 4;
  timer.sessions = 0;
  timer.running = false;
  timer.remainingTime = { total: 1500, minutes: 25, seconds: 0 };
  timer.mode = "session";
  sessionLabel.textContent = "25";
  breakLabel.textContent = "5";
  timeLeft.textContent = "25:00";
  buttonSound.pause()
  buttonSound.currentTime = 0;
}
const reset = document.getElementById("reset");
reset.addEventListener("click", resetTimer);


/*
const timer = {
  session: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
  running: false,
  remainingTime: { total: 1500, minutes: 25, seconds: 0 },
  mode: "session",
};

/* Break Length Adjustment Listeners and Functions 
const bDec = document.getElementById("break-decrement");
const bInc = document.getElementById("break-increment");
const breakLabel = document.getElementById("break-length");
function breakAdjust(e) {
  let value = Number(e.target.value);
  if (timer.shortBreak > 1 && timer.shortBreak < 60) {
    timer.shortBreak = timer.shortBreak + value;
    bDec.disabled = false;
    bInc.disabled = false;
  }
  if (timer.shortBreak <= 1) {
    bDec.disabled = true;
  }
  if (timer.shortBreak >= 60) {
    bInc.disabled = true;
  }
  const time = `${timer.shortBreak}`;
  breakLabel.textContent = `${time}`;
}
bInc.addEventListener("click", breakAdjust);
bDec.addEventListener("click", breakAdjust);

/* Session Length Adjustment Listeners and Functions 
const sDec = document.getElementById("session-decrement");
const sInc = document.getElementById("session-increment");
const sessionLabel = document.getElementById("session-length");

function sessionAdjust(e) {
  let value = Number(e.target.value);
  if (timer.shortBreak > 1 && timer.shortBreak < 60) {
    timer.session = timer.session + value;
    sDec.disabled = false;
    sInc.disabled = false;
  }
  if (timer.session <= 1) {
    sDec.disabled = true;
  }
  if (timer.session >= 60) {
    sInc.disabled = true;
  }
  const time = `${timer.session}`;
  sessionLabel.textContent = `${time}`;
}
sInc.addEventListener("click", sessionAdjust);
sDec.addEventListener("click", sessionAdjust);

let interval;

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = parseInt(difference / 1000);
  const minutes = parseInt((total / 60) % 60);
  const seconds = parseInt(total % 60);

  return {
    total,
    minutes,
    seconds,
  };
}
const timeLeft = document.getElementById("time-left");
function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, "0");
  const seconds = `${remainingTime.seconds}`.padStart(2, "0");

  const time = `${minutes}:${seconds}`;
  timeLeft.textContent = time;

  document.title = `${time} - ${timer.mode}`;
  const progress = document.getElementById("js-progress");
  progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
}

function startTimer() {
  let total = timer.remainingTime.total;
  const endTime = Date.parse(new Date()) + total * 1000;

  if (timer.mode === "session") timer.sessions++;
  mainButton.textContent = "Pause";
  timer.running = true;

  interval = setInterval(function () {
    timer.remainingTime = getRemainingTime(endTime);
    total = timer.remainingTime.total;
    updateClock();
    if (total <= 0) {
      clearInterval(interval);

      switch (timer.mode) {
        case "session":
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode("longBreak");
          } else {
            switchMode("shortBreak");
          }
          break;
        default:
          switchMode("session");
      }

      if (Notification.permission === "granted") {
        const text =
          timer.mode === "session" ? "Get back to work!" : "Take a break!";
        new Notification(text);
      }

      document.querySelector(`[data-sound="${timer.mode}"]`).play();
      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  mainButton.textContent = "Start";
  timer.running = false;
}

function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };

  document
    .querySelectorAll(".modebutton[data-mode]")
    .forEach((e) => e.classList.remove("active"));
  document.querySelector(`[data-mode="${mode}"]`).classList.add("active");
  document
    .getElementById("js-progress")
    .setAttribute("max", timer.remainingTime.total);
  document.body.style.backgroundColor = `var(--${mode})`;
  document.getElementById("timer-label").textContent = `${mode}`;

  updateClock();
}

function handleMode(event) {
  const { mode } = event.target.dataset;

  if (!mode) return;

  timer.sessions = 0;
  switchMode(mode);
  stopTimer();
}

const buttonSound = new Audio("button-sound.mp3");
const mainButton = document.getElementById("start_stop");
mainButton.addEventListener("click", () => {
  buttonSound.play();
  if (!timer.running) {
    startTimer();
  } else {
    stopTimer();
  }
});

const modeButtons = document.querySelectorAll(".modebutton");
modeButtons.forEach((modebutton) =>
  modebutton.addEventListener("click", handleMode)
);

document.addEventListener("DOMContentLoaded", () => {
  if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification(
          "Awesome! You will receive notifications at the start of a Session or a break"
        );
      }
    });
  }
  switchMode("session");
});

function resetTimer() {
  if (timer.running) {
    stopTimer();
  }
  timer.session = 25;
  timer.shortBreak = 5;
  timer.longBreak = 15;
  timer.longBreakInterval = 4;
  timer.sessions = 0;
  timer.running = false;
  timer.remainingTime = { total: 1500, minutes: 25, seconds: 0 };
  timer.mode = "session";
  sessionLabel.textContent = "25";
  breakLabel.textContent = "5";
  timeLeft.textContent = "25:00";
}
const reset = document.getElementById("reset");
reset.addEventListener("click", resetTimer);
