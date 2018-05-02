import React from 'react';
import propTypes from 'prop-types';
import './styles.css';

class WordCheck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      correctWordsCount: 0,
      falseWordsCount: 0,
    }
  }

  checkWord() {
    if(this.props.typedValue.slice(0, -1) === this.props.randomWord) {
      this.setState({
        ...this.state,
        correctWordsCount: this.state.correctWordsCount + 1,
      });
    } else {
      this.setState({
        ...this.state,
        falseWordsCount: this.state.falseWordsCount + 1,
      });
    }

    this.props.resetWord();
  }

  componentDidUpdate() {
    if(this.props.typedValue.slice(-1) === ' ') {
      this.checkWord();
    }
  }

  render() {
    return (
      <div className="WordCheck">
        <div className="CorrectWordsCount">Correct words: {this.state.correctWordsCount}</div>
        <div className="FalseWordsCount">False words: {this.state.falseWordsCount}</div>
      </div>
    )
  }
}

WordCheck.proptypes = {
  typedValue: propTypes.string,
  randomWord: propTypes.string,
  resetWord: propTypes.function,
}

export default WordCheck;