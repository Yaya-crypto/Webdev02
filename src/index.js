import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";

function Header(props) {
  return (
    <header className="header">
      <p>Memory Card Game</p>
      <button onClick={props.resetGame} className="button-3">
        New Game
      </button>
    </header>
  );
}

function Board() {
  const [cardValues, setCardValues] = useState(
    shuffleArray(["A", "B", "C", "D", "A", "B", "C", "D"])
  );
  const [selectCards, setSelectCards] = useState([]);
  const [isFlippedArr, setIsFlippedArr] = useState([]);
  const [restartGame, setIsRestartGame] = useState(false);

  function compareCards(cardValue) {
    if (selectCards.length < 1) {
      setSelectCards([cardValue, ...selectCards]);
    } else {
      if (selectCards[0] != cardValue) {
        setIsFlippedArr([selectCards[0], cardValue, ...isFlippedArr]);
      }
      setSelectCards([]);
    }
  }

  function newGame() {
    setSelectCards([]);
    setIsFlippedArr([]);
    setCardValues(shuffleArray(["A", "B", "C", "D", "A", "B", "C", "D"]));
    setIsRestartGame(!restartGame);
  }

  return (
    <div className="main-board">
      <>
        <Header resetGame={newGame} />
        <div className="board-game">
          <div className="card-row">
            {cardValues.slice(0, 4).map((item, i) => (
              <Card
                value={item}
                onClickCard={compareCards}
                flippedCards={isFlippedArr}
                setFlippedCards={setIsFlippedArr}
                cardValues={cardValues}
                key={i}
                theRealKey={i}
                gameRestart={restartGame}
              />
            ))}
          </div>

          <div className="card-row">
            {cardValues.slice(4).map((item, i) => (
              <Card
                value={item}
                onClickCard={compareCards}
                flippedCards={isFlippedArr}
                setFlippedCards={setIsFlippedArr}
                cardValues={cardValues}
                key={i + 4} // fake ass key
                theRealKey={i + 4} // real ass key
                gameRestart={restartGame}
              />
            ))}
          </div>
        </div>
      </>
    </div>
  );
}

function Card(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardValue, setCardValue] = useState(props.value);

  function handleClick(e) {
    setIsFlipped(!isFlipped);
    props.onClickCard(cardValue);
    e.preventDefault();
  }

  useEffect(() => {
    if (props.flippedCards.length !== 0) {
      for (let i = 0; i < props.flippedCards.length; i++) {
        if (props.flippedCards[i] === cardValue) {
          setTimeout(() => {
            setIsFlipped(false);
          }, 500);
          props.setFlippedCards(
            props.flippedCards.slice(0, i) +
              props.flippedCards.slice(i + 1, props.flippedCards.length)
          );
        }
      }
    }
  }, [props.flippedCards]);

  useEffect(() => {
    for (let i = 0; i < props.cardValues.length; i++) {
      if (i === props.theRealKey) {
        setCardValue(props.cardValues[i]);
      }
    }
  }, [props.cardValues]);

  useEffect(() => {
    setIsFlipped(false);
  }, [props.gameRestart]);
  return (
    <>
      {!isFlipped ? (
        <div className="card-front" onClick={(e) => handleClick(e)}></div>
      ) : (
        <div className="card-back">
          {" "}
          <p className="card-value">{cardValue}</p>{" "}
        </div>
      )}
    </>
  );
}

let keyForBoard = 1;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board key={keyForBoard} />);

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
