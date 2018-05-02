import React, { Component } from 'react';
import './styles.css';
import words from 'an-array-of-english-words';
import WordCheck from './WordCheck';
import Timer from './Timer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      randomWord: '',
      typeValue: '',
      enableTimer: false,
      timeIsUp: false,
      resetTime: false,
      resetCounters: false,
    }

    this.handleType = this.handleType.bind(this);
    this.resetWord = this.resetWord.bind(this);
    this.timeIsUp = this.timeIsUp.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  updateState(items) {
    this.setState({
      ...this.state,
      ...items,
    });
  }

  getRandomWord() {
    const randomNumber = Math.floor(Math.random() * words.length);
    return words[randomNumber];
  }

  resetWord() {
    this.updateState({
      typeValue: '',
      randomWord: this.getRandomWord()
    })
  }

  handleType(e) {
    this.updateState({
      typeValue: e.target.value,
      enableTimer: true,
      resetTime: false,
      resetCounters: false,
    });
  }

  timeIsUp(timeStatus) {
    this.updateState({
      timeIsUp: true,
      typeValue: 'Time is up!',
    });
  }

  componentDidMount() {
    this.updateState({ randomWord: this.getRandomWord() });
  }

  resetTimer() {
    this.updateState({
      enableTimer: false,
      timeIsUp: false,
      typeValue: '',
      resetTime: true,
      resetCounters: true,
    });
  }

  getRestartButton() {
    return this.state.timeIsUp && (
      <button
        className="RestartButton"
        type="reset"
        onClick={this.resetTimer}
      >
        Restart
      </button>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="Word">{this.state.randomWord}</div>
        <input
          autoFocus
          className="Input"
          disabled={this.state.timeIsUp}
          value={this.state.typeValue}
          onChange={this.handleType}
        />
        <WordCheck
          typedValue={this.state.typeValue}
          randomWord={this.state.randomWord}
          resetWord={this.resetWord}
          resetCounters={this.state.resetCounters}
        />
        <Timer
          enableTimer={this.state.enableTimer}
          timeIsUp={this.timeIsUp}
          resetTime={this.state.resetTime}
        />
        {this.getRestartButton()}
      </div>
    );
  }
}

export default App;
