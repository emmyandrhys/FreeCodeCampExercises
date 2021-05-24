//import * as React from "https://cdn.skypack.dev/react@17.0.1";
//import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import React from "react"
//import ReactDOM from "react-dom"

var countdown;

class LengthControls extends React.Component {
  render() {
    return (
      <main>
        <h3 id={this.props.titleID}>{this.props.title}</h3>
        <div>
          <button
            id={this.props.subID}
            className="adjustButton"
            value="-1" onClick={ (e) => this.props.handleTime(e)}
            datatype={this.props.dataType}
          >
            -1
          </button>
          <h2 id={this.props.lengthID}>{this.props.length}</h2>
          <button id={this.props.addID} className="adjustButton" value="1" onClick={ (e) => this.props.handleTime(e)}>
            +1
          </button>
        </div>
      </main>
    );
  }
}

function Time(props) {
  return (
    <div id="time">
      <h3 id="timer-label">{props.mode}</h3>
      <h1 id="time-left">{`${
        props.minutes.toString().length === 2
          ? props.minutes
          : "0" + props.minutes
      }:${
        props.seconds.toString().length === 2 ? props.seconds : "0" + props.seconds
      }`}</h1>
      <audio
        id="beep"
        src="https://freesound.org/data/previews/3/3647_308-lq.mp3"
      ></audio>
    </div>
  );
}

class TimerControls extends React.Component {
  render() {
    return(
    <div id="controls">
      <button id="start_stop" onClick={ (e) => {this.props.startTimer(e)}}
       >{this.props.started}
      </button>
      <button id="reset" onClick={(e) => {this.props.reset(e)}}>Reset</button>
    </div>
    )}
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakT: 5,
      session: 25,
      mode: "session",
      minutes: 25,
      seconds: 0,
      started: "Start",
      paused: false
    };
    this.handleTime = this.handleTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this)
    this.stopTimer = this.stopTimer.bind(this);
    this.switchMode = this.switchMode(this);
    this.reset = this.reset.bind(this)
  }
  handleTime(e) {
    let id = e.target.id
    let value = Number(e.target.value);
    if (id === "session-increment" || id==="session-decrement") {
      let num = this.state.session;
      num = num + value;
      this.setState({session: num});
    }
    if (id === "break-decrement" || id==="break-increment") {
      let num = this.state.breakT;
      num = num + value;
      this.setState({breakT: num});
    }
  }
  
  tick() {
    console.log("tick");
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    if (seconds > 0) {
      seconds--;
      this.setState({
        minutes: minutes,
        seconds: seconds
      });
    } else if (seconds === 0 && minutes > 0) {
      seconds = 59;
      minutes--;
      this.setState({
        minutes: minutes,
        seconds: seconds
      });
    } else {
      clearInterval(countdown);
      this.switchMode();
    }
  }
  
  startTimer() {
    const { mode, started, paused } = this.state;
    if (started === "Start"){
    //document.getElementById("start_stop").textContent = "Pause";
    //document.getElementById("reset").disabled = true;
    //document.querySelectorAll(".adjustButton").disabled = true;
    this.setState({started: "Pause"})
    if (paused) {
      this.setState({paused: false});
    } else {
      this.setState({ 
        minutes: this.state[`${mode}`],
        seconds: 0
      })
    }
    //countdown = 
    countdown = setInterval(this.tick, 1000);
  } else { this.stopTimer()}}
  
  stopTimer() {
    clearInterval(countdown);
    this.setState({
      paused: true,
      started: "Start"
    });
    document.querySelectorAll(".adjustButton").disabled = false;
  }
  switchMode() {
    console.log("switch");
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
    document.getElementById("beep").play();
    this.setState({
      minutes: minutes,
      seconds: 0,
      mode: mode
    });
    countdown = setTimeout(this.tick(), 1000);
  }

  reset() {
    this.setState({
      paused: false,
      started: "Start",
      breakT: 5,
      session: 25,
      mode: "session",
      minutes: 25,
      seconds: 0
    });
  }

  render() {
    return (
      <main>
        <LengthControls
          addID="session-increment"
          subID="session-decrement"
          title="Session Length"
          titleID="session-label"
          lengthID="session-length"
          length={this.state.session}
          dataType="session"
          handleTime={this.handleTime}
        />
        <LengthControls
          addID="break-increment"
          subID="break-decrement"
          title="Break Length"
          titleID="break-label"
          lengthID="break-length"
          length={this.state.breakT}
          dataType="break"
          handleTime={this.handleTime}
        />
        <Time
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          mode={this.state.mode}
        />
        <TimerControls 
        startTimer={this.startTimer}
        reset={this.reset}
        started={this.state.started}
        />
      </main>
    )
  }
}
//ReactDOM.render(<Timer />, document.getElementById("App"));
export default (Timer)

/*
   document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    document.getElementById("start_stop").textContent = "Start";
    document.querySelectorAll(".adjustButton").disabled = false;
  */