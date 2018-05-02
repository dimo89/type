import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

class WordCheck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      correctWordsCount: 0,
      falseWordsCount: 0,
      lettersCount: 0,
    }
  }

  updateState(items) {
    this.setState({
      ...this.state,
      ...items,
    });
  }

  checkWord() {
    if(this.props.typedValue.slice(0, -1) === this.props.randomWord) {
      this.updateState({
        lettersCount: this.state.lettersCount + this.props.typedValue.length,
        correctWordsCount: this.state.correctWordsCount + 1,
      });
    } else {
      this.updateState({
        lettersCount: this.state.lettersCount + this.props.typedValue.length,
        falseWordsCount: this.state.falseWordsCount + 1,
      });
    }

    this.props.resetWord();
  }

  resetAllCounters() {
    this.updateState({
      lettersCount: 0,
      correctWordsCount: 0,
      falseWordsCount: 0,
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.typedValue.slice(-1) === ' ') {
      this.checkWord();
    }

    if(prevProps.resetCounters !== this.props.resetCounters && this.props.resetCounters) {
      this.resetAllCounters();
    }
  }

  render() {
    return (
      <div className="WordCheck">
        <div className="CorrectWordsCount">Correct words: {this.state.correctWordsCount}</div>
        <div className="FalseWordsCount">False words: {this.state.falseWordsCount}</div>
        <div className="WordsPerMinute">Words per minute: {this.state.correctWordsCount + this.state.falseWordsCount}</div>
        <div className="LettersCount">Keystrokes: {this.state.lettersCount}</div>
      </div>
    )
  }
}

WordCheck.proptypes = {
  typedValue: propTypes.string,
  randomWord: propTypes.string,
  resetWord: propTypes.function,
  resetCounters: propTypes.bool,
}

export default WordCheck;