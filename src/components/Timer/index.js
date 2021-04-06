import React,{Component} from 'react';

export default class Example extends React.Component {
    constructor() {
      super();
      this.state = { time: {}};
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.props.seconds);
      this.setState({ time: timeLeftVar });
      this.startTimer()
    }

  
    startTimer() {
        
      if (this.timer == 0 && this.props.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
        
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      this.props.setSeconds()
      const seconds = this.props.seconds
      this.setState({
        time: this.secondsToTime(seconds)
      });
    //   console.log(seconds)
      
      
      // Check if we're at zero.
      if (seconds == 0) { 
        clearInterval(this.timer);
      }
    }
  
    render() {
      const {m,s} = this.state.time
    //   console.log(this.state.time)
      return(
        <div className={`${this.props.seconds < 10 ? 'text-danger' : null } time data ${this.props.grid > 7 ? 'pr-3' : 'ml-4'}`}>Time spent: <span>{m < 10 ? "0"+m : m}:{s < 10 ? "0"+s : s} secs</span></div>
      );
    }
  }