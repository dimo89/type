import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      words: ["one", "random", "dog", "plane", "house"],
      randomWord: '',
      typeValue: '',
      correctWordsCount: 0,
      falseWordsCount: 0,
    }

    this.handleType = this.handleType.bind(this);
    this.checkWord = this.checkWord.bind(this);
  }

  getRandomWord() {
    const randomNumber = Math.floor(Math.random() * this.state.words.length);
    return this.state.words[randomNumber];
  }

  checkWord() {
    if(this.state.typeValue.slice(0, -1) === this.state.randomWord) {
      console.log('yes');
      this.setState((prevState) => ({
        ...this.state,
        correctWordsCount: prevState.correctWordsCount + 1,
      }));
    } else {
      console.log('no');
      this.setState({
        ...this.state,
        falseWordsCount: this.state.falseWordsCount + 1,
      });
    }
    console.log(this.state.correctWordsCount);
  }

  resetWord() {
    this.setState({
      ...this.state,
      typeValue: ''
    });
  }

  handleType(e) {
    const value = e.target.value;

    this.setState({
      ...this.state,
      typeValue: value,
    }, () => {
      console.log(this.state);
      if(this.state.typeValue.slice(-1) === ' ') {
        this.checkWord();
        this.resetWord();
      }
    });
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      randomWord: this.getRandomWord(),
      correctWordsCount: 0,
      falseWordsCount: 0,
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
        <div>{this.state.correctWordsCount}</div>
        <div>{this.state.falseWordsCount}</div>
      </div>
    );
  }
}

export default App;
