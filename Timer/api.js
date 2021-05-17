import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
//import * as React from "https://cdn.skypack.dev/react@17.0.1";
//import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

var started = false;
var paused = false;
let countdown;

class LengthControls extends React.Component {
  render() {
    return (
      <main>
        <h3 id={this.props.titleID}>{this.props.title}</h3>
        <div>
          <button
            id={this.props.addID}
            className="adjustButton"
            data-type={this.props.dataType}
            onClick={this.handleTime}
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
      </main>
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
        <h1 id="time-left">{this.clock()}</h1>
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
    this.reset = this.reset.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.switchMode = this.switchMode.bind(this);
  }

  startTimer() {
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

  stopTimer() {
    clearTimeout(countdown);
    paused = true;
    document.querySelectorAll(".adjustButton").disabled = false;
  }

  tick() {
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

  switchMode() {
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

  reset() {
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
  /*document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    document.getElementById("start_stop").textContent = "Start";
    document.querySelectorAll(".adjustButton").disabled = false;*/

  handleTime(e) {
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
          onClick={this.handleTime}
          dataType="session"
        />
        <LengthControls
          addID="break-increment"
          subId="break-decrement"
          title="Break Length"
          titleID="break-label"
          lengthID="break-length"
          length={this.state.breakT}
          onClick={this.handleTime}
          dataType="break"
        />
        <TimerControls
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          mode={this.state.mode}
        />
        <div id="controls">
          <button
            id="start_stop"
            onClick={started ? this.startTimer() : this.stopTimer()}
          >
            {started ? "Pause" : "Start"}
          </button>
          <button id="reset" onClick={this.reset()}>
            Reset
          </button>
        </div>
      </main>
    );
  }
}

ReactDOM.render(<Timer />, document.getElementById("main"));
