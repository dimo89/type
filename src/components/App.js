import React, { Component } from 'react';
import './App.css';
import words from 'an-array-of-english-words';
import WordCheck from './WordCheck';

class App extends Component {
  constructor() {
    super();

    this.state = {
      words,
      randomWord: '',
      typeValue: '',
    }

    this.handleType = this.handleType.bind(this);
    this.resetWord = this.resetWord.bind(this);
  }

  getRandomWord() {
    const randomNumber = Math.floor(Math.random() * this.state.words.length);
    return this.state.words[randomNumber];
  }

  resetWord() {
    this.setState({
      ...this.state,
      typeValue: '',
      randomWord: this.getRandomWord(),
    });
  }

  handleType(e) {
    const value = e.target.value;

    this.setState({
      ...this.state,
      typeValue: value,
    });
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      randomWord: this.getRandomWord(),
    });
  }

  render() {
    return (
      <div className="App">
        <div className="Word">{this.state.randomWord}</div>
        <input
          autoFocus
          className="Input"
          value={this.state.typeValue}
          onChange={this.handleType}
        />
        <WordCheck
          typedValue={this.state.typeValue}
          randomWord={this.state.randomWord}
          resetWord={this.resetWord}
        />
      </div>
    );
  }
}

export default App;
