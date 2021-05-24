import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

var started = false;

class LengthControls extends React.Component {
  render() {
    return (
      <main>
        <h3 id={this.titleID}>{this.title}</h3>
        <div>
          <button
            id={this.addID}
            className="adjustButton"
            dataType={this.dataType}
            value="-1"
          >
            -1
          </button>
          <h2 id={this.lengthID}>{this.length}</h2>
          <button id={this.subID} className="adjustButton" value="1">
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
        props.toString().length === 2 ? props.seconds : "0" + props.seconds
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
    <div id="controls">
      <button id="start_stop">
        {" "}
        {/*onClick={started ? startTimer : this.stopTimer}>*/}
        {started ? "Pause" : "Start"}
      </button>
      <button id="reset">Reset</button>
    </div>;
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakT: 5,
      session: 25,
      mode: "session",
      minutes: 25,
      seconds: 0
    };
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
          dataType="session"
        />
        <LengthControls
          addID="break-increment"
          subId="break-decrement"
          title="Break Length"
          titleID="break-label"
          lengthID="break-length"
          length={this.state.breakT}
          dataType="break"
        />
        <Time
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          mode={this.state.mode}
        />
        <TimerControls />
      </main>
    )
  }
}
ReactDOM.render(<Timer />, document.getElementById("main"));

/*
clock() {
    var minutes = this.props.minutes;
    var seconds = this.props.seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }
  
   startTimer() {
    console.log("start");
    const { mode, minutes, seconds } = this.state;
    document.getElementById("start_stop").textContent = "Pause";
    document.getElementById("reset").disabled = true;
    document.querySelectorAll(".adjustButton").disabled = true;
    started = true;
    let total;
    if (paused === true) {
      total = minutes * 60 + seconds;
      paused = false;
      countdown = setTimeout(tick(total), 1000);
    } else {
      total = this.state[`${mode}`] * 60;
      countdown = setTimeout(tick(total), 1000);
    }
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
      case "break":
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
    setTimeout(this.tick(), 1000);
  }
  handleTime() {
    let value = Number(e.target.value);
    let type = e.target.dataType;
    if (type === "session") {
      let num = this.state.session;
      num = num + value;
      this.setState((session = num));
    }
    if (type === "break") {
      let num = this.state.breakT;
      num = num + value;
      this.setState((breakT = num));
    }
  }

  reset() {
    console.log("reset");
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
   document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    document.getElementById("start_stop").textContent = "Start";
    document.querySelectorAll(".adjustButton").disabled = false;

  handleTime(e, type, value) {
    value = Number(value);
    if (type === "session") {
      let num = this.state.session;
      num = num + value;
      this.setState((session = num));
    }
    if (type === "break") {
      let num = this.state.breakT;
      num = num + value;
      this.setState((breakT = num));
    }
  }
  
 

  stopTimer() {
    console.log("stop");
    clearTimeout(countdown);
    paused = true;
    document.querySelectorAll(".adjustButton").disabled = false;
  }

  tick() {
    console.log("tick");
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
    setTimeout(this.tick(), 1000);
  }
  */





























