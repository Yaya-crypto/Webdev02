import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";

function Header(props) {
  return (
    <header className="header">
      <p>Memory Card Game</p>
      <button className="button-3">New Game</button>
    </header>
  );
}

function Board() {
  const [cardValues, setCardValues] = useState(
    shuffleArray(["A", "B", "C", "D", "A", "B", "C", "D"])
  );
  const [selectCards, setSelectCards] = useState([]);
  const [isFlippedArr, setIsFlippedArr] = useState([]);

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


  return (
    <>
      <Header 
      />
      <div className="board-game">
        <div className="card-row">
          {cardValues.slice(0, 4).map((item) => (
            <Card
              value={item}
              onClickCard={compareCards}
              flippedCards={isFlippedArr}
              setFlippedCards={setIsFlippedArr}
            />
          ))}
        </div>

        <div className="card-row">
          {cardValues.slice(4).map((item) => (
            <Card
              value={item}
              onClickCard={compareCards}
              flippedCards={isFlippedArr}
              setFlippedCards={setIsFlippedArr}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default function Card(props) {
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

  return (
    <>
      {!isFlipped ? (
        <div className="card-front" onClick={(e) => handleClick(e)}></div>
      ) : (
        <div className="card-back">
          {" "}
          <p>{cardValue}</p>{" "}
        </div>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);

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
