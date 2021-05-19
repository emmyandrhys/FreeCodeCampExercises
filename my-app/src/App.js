import './App.css';

import * as React from 'react'
//import * as ReactDOM from 'react-dom'

var started = false;
var paused = false;
let countdown;

function clock(minutes, seconds) {
  //var minutes = Timer.state.minutes;
  //var seconds = Timer.state.seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
};

function LengthControls(props){ //extends React.Component{
  render() {
    return (
      <div>
        <h3 id={props.titleID}>{props.title}</h3>
          <button
            id={props.addID}
            className="adjustButton"
            data-type={props.dataType}
            onClick={props.handleTime}
            value="-1"
          >
            -1
          </button>
          <h2 id={this.props.lengthID}>{this.props.length}</h2>
          <button
            id={this.props.subID}
            className="adjustButton"
            onClick={this.handleTime}
            value="1"
          >
            +1
          </button>
        </div>
    );
  }
}

class TimerControls extends React.Component {
  clock() {
    var minutes = this.props.minutes;
    var seconds = this.props.seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }
  render() {
    return (
      <div id="timer">
        <h3 id="timer-label">{this.props.mode}</h3>
        <h1 id="time-left">{clock()}</h1>
        <audio
          id="beep"
          src="https://freesound.org/data/previews/3/3647_308-lq.mp3"
        ></audio>
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      breakT: 5,
      session: 25,
      mode: "session",
      minutes: 25,
      seconds: 0
    };
    this.handleTime = this.handleTime.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.switchMode = this.switchMode.bind(this);
    this.tick=this.tick.bind(this)
  }
  
  tick = () => {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    if (seconds > 0 && minutes > 0) {
      seconds--;
    } else if (seconds === 0 && minutes > 0) {
      seconds = 59;
      minutes--;
    } else {
      clearTimeout(this.tick);
      this.switchMode();
    }
    this.setState({
      minutes: minutes,
      seconds: seconds
    });
    setTimeout(this.tick, 1000);
  }

  startTimer = () => {
    const { mode } = this.state;
    //document.getElementById("start_stop").textContent = "Pause";
    //document.getElementById("reset").disabled = true;
    //document.querySelectorAll(".adjustButton").disabled = true;
    started = true;
    if (paused === true) {
      paused = false;
      countdown = setTimeout(this.tick, 1000);
    } else {
      let minutes = this.state[`${mode}`] * 60;
      this.setState({
        minutes: minutes, 
        seconds: 0
      })
      countdown = setTimeout(this.tick(), 1000);
    }
  }

  stopTimer = () => {
    clearTimeout(countdown);
    paused = true;
    //document.querySelectorAll(".adjustButton").disabled = false;
  }

  switchMode = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    let minutes;
    let mode;
    switch (this.state.mode) {
      case "session":
        mode = "break";
        minutes = this.state.breakT;
        break;
      default:
        mode = "session";
        minutes = this.state.session;
        break;
    }
    //document.getElementById("beep").play();
    this.setState({
      minutes: minutes,
      seconds: 0,
      mode: mode
    });
    setTimeout(this.tick, 1000);
  }

  resetTimer = () => {
    paused = false;
    started = false;
    this.setState({
      breakT: 5,
      session: 25,
      mode: "session",
      minutes: 25,
      seconds: 0
    });
  }

  handleTime = (e) => {
    let value = Number(e.target.value);
    let type = e.target.dataType;
    if (type === "session") {
      var session = this.state.session;
      let num = session + value;
      this.setState(session=num)
    }
    if (type === "break") {
      var breakT = this.state.breakT;
      let num = breakT + value;
      this.setState(breakT=num);
    }
  }

  render() {
    return (
      <main>
        <LengthControls
          addID="session-increment"
          subId="session-decrement"
          title="Session Length"
          titleID="session-label"
          lengthID="session-length"
          length={this.state.session}
          onClick={(e) => this.handleTime(e)}
          dataType="session"
        />
        {/*<div>
        <h3 id='session-label'>Session</h3>
          <button
            id="session-decrement"
            className="adjustButton"
            data-type="session"
            onClick={() => function() {if (this.state.session > 1) { let num = this.state.session - 1; this.setState({session: num})}}}
            value="-1"
          >
            -1
          </button>
          <h2 id="session-length">{this.state.session}</h2>
          <button
            id='session-increment'
            className="adjustButton"
            onClick={() => function() {if (this.state.session < 60) { let num = this.state.session + 1; this.setState({session: num})}}}
            value="1"
          >
            +1
          </button>
        </div>
        <div>
        <h3 id='break-label'>Break</h3>
          <button
            id="break-decrement"
            className="adjustButton"
            data-type="break"
            onClick={() => function() {if (this.state.breakT > 1) { let num = this.state.breakT - 1; this.setState({breakT: num})}}}
            value="-1"
          >
            -1
          </button>
          <h2 id="break-length">{this.state.breakT}</h2>
          <button
            id='break-increment'
            className="adjustButton"
            onClick={() => function() {if (this.state.breakT < 60) { let num = this.state.breakT + 1; this.setState({breakT: num})}}}
            value="1"
          >
            +1
          </button>
        </div>*/}
        <LengthControls
          addID={"break-increment"}
          subId={"break-decrement"}
          title={"Break Length"}
          titleID={"break-label"}
          lengthID={"break-length"}
          length={this.state.breakT}
          onClick={(e) => this.handleTime(e)}
        dataType="break"/> 
        <TimerControls
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          mode={this.state.mode}
        />
        <div id="timer">
        <h3 id="timer-label">{this.state.mode}</h3>
        <h1 id="time-left">{clock(this.state.minutes, this.state.seconds)}</h1>
        <audio
          id="beep"
          src="https://freesound.org/data/previews/3/3647_308-lq.mp3"
        ></audio>
      </div>
        <div id="controls">
          <button
            id="start_stop" onClick={started ? this.startTimer : this.stopTimer}
          >
            {started ? "Pause" : "Start"}
          </button>
          <button id="reset" onClick={this.resetTimer}>
            Reset
          </button>
        </div>
      </main>
    );
  }
}

//ReactDOM.render(<Timer />, document.getElementById("root"));


export default Timer;
