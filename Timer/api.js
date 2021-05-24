import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
//import soundfile from "https://freesound.org/data/previews/3/3647_308-lq.mp3";
//import React from "https://cdn.skypack.dev/react";
//import ReactDOM from "https://cdn.skypack.dev/react-dom"
//import ReactAudioPlayer from "https://cdn.skypack.dev/react-audio-player";

var countdown;

class LengthControls extends React.Component {
  render() {
    return (
      <main class="lengthControls">
        <h3 id={this.props.titleID}>{this.props.title}</h3>
        <div class="adjustments">
          <button
            id={this.props.subID}
            className="adjustButton"
            value="-1"
            onClick={(e) => this.props.handleTime(e)}
            datatype={this.props.dataType}
          >
            -1
          </button>
          <h2 id={this.props.lengthID}>{this.props.length}</h2>
          <button
            id={this.props.addID}
            className="adjustButton"
            value="1"
            onClick={(e) => this.props.handleTime(e)}
          >
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
        props.seconds.toString().length === 2
          ? props.seconds
          : "0" + props.seconds
      }`}</h1>
      {/*} <audio
        id="beep"
        preload="auto"
        ref={(audio) => {
          this.props.audioBeep = audio;
        }}
        src="https://freesound.org/data/previews/3/3647_308-lq.mp3"
      ></audio> */}
    </div>
  );
}

class TimerControls extends React.Component {
  render() {
    return (
      <div id="controls">
        <button
          id="start_stop"
          onClick={(e) => {
            this.props.startTimer(e);
          }}
        >
          {this.props.started}
        </button>
        <button
          id="reset"
          onClick={(e) => {
            this.props.reset(e);
          }}
        >
          Reset
        </button>
      </div>
    );
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
      seconds: 0,
      started: "Start",
      paused: false,
      clock: "25:00"
    };
    this.handleTime = this.handleTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.switchMode = this.switchMode.bind(this);
    this.reset = this.reset.bind(this);
    this.clock = this.clock.bind(this);
    // this.buzzer = this.buzzer.bind(this);
  }
  //  alert = (tSc) => {
  //  this.myRef = React.createRef();
  //if (tSc === timerStates.COMPLETE)
  //return <audio ref={this.myRef} src={soundfile} autoPlay />;
  //};
  handleTime(e) {
    let id = e.target.id;
    let value = Number(e.target.value);
    if (id === "session-increment" || id === "session-decrement") {
      let num = this.state.session;
      num = num + value;
      if (num > 0 && num <= 60) {
        this.setState({ session: num });
      }
    } else {
      let num = this.state.breakT;
      num = num + value;
      if (num > 0 && num <= 60) {
        this.setState({ breakT: num });
      }
    }
  }

  tick() {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    if (seconds > 0) {
      seconds--;
      this.setState({
        minutes: minutes,
        seconds: seconds
      });
      this.clock();
    } else if (seconds === 0 && minutes > 0) {
      seconds = 59;
      minutes--;
      this.setState({
        minutes: minutes,
        seconds: seconds
      });
      this.clock();
    } else {
      //this.audioBeep.play();
      clearInterval(countdown);
      this.switchMode();
    }
  }

  startTimer() {
    const { mode, started, paused } = this.state;
    if (started === "Start") {
      //document.getElementById("start_stop").textContent = "Pause";
      //document.getElementById("reset").disabled = true;
      //document.querySelectorAll(".adjustButton").disabled = true;
      this.setState({ started: "Pause" });
      if (paused) {
        this.setState({ paused: false });
      } else {
        this.setState({
          minutes: this.state[`${mode}`],
          seconds: 0
        });
      }
      countdown = setInterval(this.tick, 1000);
    } else {
      this.stopTimer();
    }
  }

  stopTimer() {
    clearInterval(countdown);
    this.setState({
      paused: true,
      started: "Start"
    });
  }

  switchMode() {
    //audio.pause();
    //audio.currentTime = 0;
    if (this.state.mode === "session") {
      this.setState({
        mode: "break",
        minutes: this.state.breakT
      });
      minutes = this.state.breakT;
    } else {
      this.setState({
        mode: "session",
        minutes: this.state.session
      });
    }
    countdown = setInterval(this.tick(), 1000);
  }

  reset() {
    clearInterval(countdown);
    this.setState({
      paused: false,
      started: "Start",
      breakT: 5,
      session: 25,
      mode: "session",
      minutes: 25,
      seconds: 0
    });
    // this.audioBeep.pause;
    // this.audioBeep.currentTime = 0;
  }

  clock() {
    //this.buzzer();
    var { minutes, seconds } = this.state;
    minutes = minutes.toString();
    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }
    seconds = seconds.toString();
    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }
    this.setState({ clock: minutes + ":" + seconds });
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
          clock={this.state.clock}
          mode={this.state.mode}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
        />
        <TimerControls
          startTimer={this.startTimer}
          reset={this.reset}
          started={this.state.started}
        />
      </main>
    );
  }
}
ReactDOM.render(<Timer />, document.getElementById("main"));
//export default (Timer)

/*
   document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    document.getElementById("start_stop").textContent = "Start";
    document.querySelectorAll(".adjustButton").disabled = false;
  */

//function Audio(props) {
//const audioBeep = new Audio('https://freesound.org/data/previews/3/3647_308-lq.mp3');
//const playBeep = () => {
//audioBeep.play()
//  }
//const stopBeep = () => {
//audioBeep.pause();
//    audioBeep.currentTime=0;
//}
//return (<audio id="beep" stop={this.stop} play={this.play}> </audio>)
//}
{
  /*      <div id="time">
          <h3 id="timer-label">{this.state.mode}</h3>
          <h1 id="time-left">{`${
            this.state.minutes.toString().length === 2
              ? this.state.minutes
              : "0" + this.state.minutes
          }:${
            this.state.seconds.toString().length === 2
              ? this.state.seconds
              : "0" + this.state.seconds
          }`}</h1>
          {/*}    <audio
            id="beep"
            preload="auto"
            ref={this.audioBeep}
            src="https://freesound.org/data/previews/3/3647_308-lq.mp3"
          ></audio>
         {/*} <Audio play={Audio.play} stop={Audio.stop} /> */
}
//  buzzer(_timer) {
//  if (_timer === 0) {
//  this.audioBeep.play();
//}
//}
