import React from "react";
import ReactDOM from "react-dom/client";
import ReactCardFlip from "react-card-flip";
import "./css/index.css";
import { Children, cloneElement } from "react";

function Header(props) {
  return (
    <header className="header">
      <p>Memory Card Game</p>
      <button className="button-3">New Game</button>
    </header>
  );
}

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardValues: shuffleArray(["A", "B", "C", "D", "A", "B", "C", "D"]),
      openCards: [],
      clearedCardss: [],
    };
  }

  handleClick() {
    if (true) {
    }
  }
  render() {
    return (
      <body>
        <Header />
        <Board cardValues={this.state.cardValues} />
      </body>
    );
  }
}

// const winner = participants[Math.floor(Math.random() * participants.length)]
class Board extends React.Component {
  render() {
    let arr = this.props.cardValues.slice(0, 4);
    let arr2 = this.props.cardValues.slice(4);

    return (
      <div className="board-game">
        <div className="card-row">
          {arr.map((item) => (
            <Card value={item} />
          ))}
        </div>

        <div className="card-row">
          {arr2.map((item) => (
            <Card value={item} />
          ))}
        </div>
      </div>
    );
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    if (this.state.isFlipped === false) {
      return <div className="card-front" onClick={this.handleClick}></div>;
    } else {
      return (
        <div className="card-back">
          {" "}
          <p>{this.props.value}</p>{" "}
        </div>
      );
    }
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MemoryGame />);

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
