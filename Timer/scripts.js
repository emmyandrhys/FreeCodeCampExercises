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
        const { total, minutes, seconds } = this.state
        total--;
        minutes = Math.floor(total / 60 )

        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            
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
            total: 1500, 
            minutes: 25, 
            seconds: 0,
            paused: true
        }
        this.reset = this.reset.bind(this);
        this.startStop = this.startStop.bind(this);
        this.handleBreak = this.handleBreak.bind(this);
        this.handleSession = this.handleSession.bind(this);
        this.tick = this.tick.bind(this)
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