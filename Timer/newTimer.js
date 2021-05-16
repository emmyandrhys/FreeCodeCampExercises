const countDown = document.getElementById('time-left');

/* global variables and constants*/
let countDownInterval;
let timeLeftMS;
let endTime;
let running = false;
let mode = 'Session';
let sessionLength = 25;
let breakLength = 5;
/* global variables ends */

/* Break Length Adjustment Listeners and Functions */
const bDec = document.getElementById('break-decrement');
const bInc = document.getElementById('break-increment');
const breaklabel = document.getElementById('break-length')
bDec.addEventListener('click', breakAdjust(-1)); 
bInc.addEventListener('click', breakAdjust(1));

//const breakAdjust = (value) => {
function breakAdjust(value) {
    if (60 > breakLength > 1) {
        breakLength += value;
        bDec.disabled = false;
        bInc.disabled = false;
    }
    if (breakLength <= 1) {
        bDec.disabled = true;
    }
    if (breakLength >= 60) {
        bInc.disabled = true;
    }
    breaklabel.innerHTML = `${breakLength}`
};
    
/* Session Length Adjustment Listeners and Functions */
const sDec = document.getElementById('session-decrement');
const sInc = document.getElementById('session-increment');
const sessionlabel = document.getElementById('session-length')
sDec.addEventListener('click', sessionAdjust(-1));
sInc.addEventListener('click', sessionAdjust(1));

//const sessionAdjust = (value) => {
function sessionAdjust(value) {
    if (60 > sessionLength > 1) {
        sessionLength += value;
        sDec.disabled = false;
        sInc.disabled = false;
    }
    if (sessionLength <= 1) {
        sDec.disabled = true;
    }
    if (sessionLength >=60) {
        sInc.disabled = true;
    }
    sessionlabel.innerHTML = `${sessionLength}`
};

// Start stop Button Listener and Function
const startStop = document.getElementById('start_stop')
startStop.addEventListener('cick', startStopTimer);    

//const startStopTimer = () => {
function startStopTimer() {
    if (running === true) {
        startStop.innerHTML = 'START';
        clearInterval(countDownInterval);
        timeLeft = 60000 * minutes + 1000 * seconds;
        running = false;
    } else if (running === false) {
        stopBtn.innerHTML = 'PAUSE';
        resetBtn.disabled = true;
        running = true;

        let countDownTime;
        if (mode === 'Session' && timeLeft === 0) {
            countDownTime = sessionLength * 60000;
        } else if (mode === 'Break' && timeLeft === 0) {
            countDownTime = breakLength * 60000;
        } else {
            countDownTime= timeLeft 
        }            
        const now = Date.now();
        endTime = now + countDownTime;
        setCountDown(endTime);
        countDownInterval = setInterval(() => { setCountDown(endTime); }, 1000);        
        }
    };

/* setCountDown function */
//const setCountDown = (endTime) => {
function setCountDown(endTime) {
    timeLeftMS = endTime - Date.now();
    const secondsLeft = Math.round(timeLeftMS / 1000);
    let minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;

    if (minutes < 10) {
        minutes = `0${minutes}`;
    } if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    if (secondsLeft <= 0) {
        switchmode();
        return;
    }
    countDown.innerHTML = `${minutes} : ${seconds}`;
};

/* switchmode function */
const timerlabel = document.getElementById('timer-label');
//const switchmode = () => {
function switchmode() {
    if (mode === 'Session') {
        mode = 'Break';
        timerlabel.innerHTML = 'Break'
        countDownTime = breakLength * 60000;
    } else {
        mode = 'Session';
        timerlabel.innerHTML = 'Session'
        countDownTime = sessionLength * 60000;
    }
    const now = Date.now();
    endTime = now + countDownTime;
    setCountDown(endTime);
    countDownInterval = setInterval(() => { setCountDown(endTime); }, 1000); 
}

/* resetCountDown Listener & function */
const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
    resetCountDown();});

//const resetCountDown = () => {
function resetCountDown() {
    clearInterval(countDownInterval);
    countDown.innerHTML = '25 : 00';
    stopBtnClicked = false;
    stopBtn.innerHTML = 'START';
    mode = 'Session';
    sessionLength = 25;
    breakLength = 5;
    sessionlabel.innerHTML = `${sessionLength}`;
    breaklabel.innerHTML = `${breakLength}`
};


function startCountdown(seconds) {
    let counter = seconds;
    
    const interval = setInterval(() => {
        let minutes = Math.floor(counter / 60);
        let seconds = counter % 60;
    
        if (minutes < 10) {
            minutes = `0${minutes}`;
        } if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        if (counter <= 0) {
            clearInterval(interval)
            switchmode();
            return;
        
      }
    }, 1000);
  }