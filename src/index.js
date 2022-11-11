
import React from "react";
import ReactDOM from "react-dom/client";
import ReactCardFlip from 'react-card-flip';
import "./css/index.css";

function Header(props){
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

    }
  }

  render() {
    return (
      <body>
        <Header />
        <Board 
          cardValues = {['A','B','C','D','A','B','C', 'D']}
        />
      </body>
    );
  }
}


// const winner = participants[Math.floor(Math.random() * participants.length)]
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  renderCard() {
    const randomValue = this.props.cardValues[[Math.floor(Math.random() * this.props.cardValues.length)]];
    const indexValue = this.props.cardValues.indexOf(randomValue);
    this.props.cardValues.splice(indexValue,1);
    return <Card 
      value={randomValue}
    />;

  }

  render()  {
    return (
      <div className="board-game">
        <div className="card-row">
          {this.renderCard()}
          {this.renderCard()}
          {this.renderCard()}
          {this.renderCard()}
        </div>

        <div className="card-row">
          {this.renderCard()}
          {this.renderCard()}
          {this.renderCard()}
          {this.renderCard()}
        </div>
      </div>
    );
  }
}

class Card extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

    render() {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
          <div className="card-front" onClick={this.handleClick}></div>
          <div className="card-back"> {this.props.value}</div>
        </ReactCardFlip>
      )
    }
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MemoryGame />);

function isGameOver() {

}

function calculateTie() {

}
