import React from 'react';
import PropTypes from 'prop-types';

const SECONDS_INIT_VALUE = 60;

class Timer extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      seconds: SECONDS_INIT_VALUE,
    }

    this.tick = this.tick.bind(this);
    this.timer = null;
  }

  tick() {
    this.setState({
      seconds: this.state.seconds - 1,
    });

    if(this.state.seconds <= 0) {
      clearInterval(this.timer);
      this.props.timeIsUp(true)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  resetTime(){
    this.setState({
      seconds: SECONDS_INIT_VALUE,
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.resetTime !== this.props.resetTime && this.props.resetTime) {
      this.resetTime();
    }

    if(prevProps.enableTimer !== this.props.enableTimer && this.props.enableTimer) {
      this.timer = setInterval(this.tick, 1000);
    }
  }

  render() {
    return (
      <div className="Timer">{this.state.seconds} seconds left</div>
    );
  }
}

Timer.proptypes = {
  enableTimer: PropTypes.bool,
  timeIsUp: PropTypes.func,
  resetTime: PropTypes.bool,
}

export default Timer;