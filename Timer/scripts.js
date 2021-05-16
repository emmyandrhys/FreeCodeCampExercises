import React, { Component } from 'react';

/********************************************************************************************************************
Countdown.js is a simple script to add a countdown timer
for your website. Currently it can only do full minutes
and partial minutes aren't supported. This script is a fork of http://jsfiddle.net/HRrYG/ with some 
added extensions. Since the original code that I forked was released under Creative Commons by SA license, 
I have to release this code under the same license. You can view a live demo of this code at http://jsfiddle.net/JmrQE/2/.
********************************************************************************************************************/
function countdown(minutes, seconds) {
    var secs = seconds;
    var mins = minutes;
    function tick() {
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 
        var counter = document.getElementById("counter");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
        }
    }
    tick();
}
//You can use this script with a call to onclick, onblur or any other attribute you would like to use. 
countdown(n);//where n is the number of minutes required. 

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            break: 5,
            session: 25,
            mode: 'Session',
            minsSecs: {minutes: 25, seconds: 0},
            paused: true
        }
        this.reset = this.reset.bind(this);
        this.startStop = this.startStop.bind(this);
        this.handleBreak = this.handleBreak.bind(this);
        this.handleSession = this.handleSession.bind(this);
    }
    
    startStop() {
        const { remainingMin, remainingSec, paused, mode } = this.state;
        if (mode==='Session') {
            this.setState=({
                
            })

        }
    }
    

    reset(){
        this.setState({
            break: 5,
            session: 25,
            mode: 'Session',
            remaining: {minutes: 25, seconds: 0}
        })
    }

    handleBreak(e) {
        const value = e.target.value;
        const btime = this.state.break;
        if (0 < btime + value <= 60) {
            this.setState({
                break: btime + value
            })
        }
    }

    handleSession(e) {
        const value = e.target.value;
        const stime = this.state.session;
        if (0 < stime + value <= 60) {
            this.setState({
                session: stime + value
            })
        }
    }

    render() {
        <div id="timer-app">
            <Session session={this.handleSession}/>
            <Break break={this.handleBreak}/>
            <div id="timerBox">
                <h3 id="timer-label">{this.state.mode}</h3>
                <CountDownTimer />       
                <div id="controls">
                    <button id="start_stop" onClick={this.startStop}></button>
                    <button id="reset" onClick={this.reset}></button>
                </div>
            </div>
        </div>
    }
}
class Break extends React.Component{
    render() {
        return (
            <div id="break">
                <h3 id="break-label">Break Length</h3>
                <button id="break-decrement" onClick={this.props.break} value='-1'>-1</button>
                <h2 id="break-length">{this.props.break}</h2>
                <button id="break-increment" onClick={this.props.break} value='1'>+1</button>
            </div>
        )
    }
}
class Session extends React.Component{
    render() {
        return (
            <div id="session">
                <h3 id="session-label">Session Length</h3>
                <button id="session-decrement" onClick={this.props.session} value="-1">-1</button>
                <h2 id="session-length">{this.props.session}</h2>
                <button id="session-increment" onClick={this.props.session} value="1">+1</button>
            </div> 
        )
    }
}

ReactDOM.render(<Timer />, document.getElementById('timer'))

User Story #18: When I first click the element with id="start_stop", the timer should begin running from the value currently displayed in id="session-length", even if the value has been incremented or decremented from the original value of 25.
User Story #19: If the timer is running, the element with the id of time-left should display the remaining time in mm:ss format (decrementing by a value of 1 and updating the display every 1000ms).
User Story #20: If the timer is running and I click the element with id="start_stop", the countdown should pause.
User Story #21: If the timer is paused and I click the element with id="start_stop", the countdown should resume running from the point at which it was paused.
User Story #22: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a break has begun.
User Story #23: When a session countdown reaches zero (NOTE: timer MUST reach 00:00), a new break countdown should begin, counting down from the value currently displayed in the id="break-length" element.
User Story #24: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a session has begun.
User Story #25: When a break countdown reaches zero (NOTE: timer MUST reach 00:00), a new session countdown should begin, counting down from the value currently displayed in the id="session-length" element.
User Story #26: When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 audio tag and have a corresponding id="beep".
User Story #27: The audio element with id="beep" must be 1 second or longer.
User Story #28: The audio element with id of beep must stop playing and be rewound to the beginning when the element with the id of reset is clicked.