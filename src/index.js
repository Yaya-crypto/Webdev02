
import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";

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
        <Board />
      </body>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header className="header">

        <p>Memory Card Game</p>
        <button className="button-3">New Game</button>
      </header>
    );
  }
}

class Board extends React.Component {
  renderCard() {
    return <Card />;
  }

  render() {
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

function Card(props) {
  return <div className="card"></div>;
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MemoryGame />);
