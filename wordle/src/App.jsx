import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { words } from "./Words.jsx";
import Board from "./Board.jsx";
import Keyboard from "./Keyboard.jsx";

const merge = (letters, word) => {
  return Array.from(new Set(letters + word)).join("");
};

function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(new Array(6).fill(""));
  const [currentWord, setCurrentWord] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [letters, setLetters] = useState("");
  const [statu, setStatu] = useState("");
  const [load, setload] = useState("");

  const selectWord = () => {
    setSolution(words[Math.floor(Math.random() * words.length)]);
  };

  useEffect(() => {
    selectWord();
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (statu == "") {
        const { key } = e;
        if ((key === "Backspace" || key === "-") && currentWord.length > 0) {
          setCurrentWord((currentRow) => currentRow.slice(0, -1));
        } else if (currentWord.length === 5) {
          if (key !== "Enter" && key !== "+") {
            return;
          } else {
            setGuesses((guesses) =>
              guesses.map((guess, id) =>
                id === currentRow ? currentWord : guess
              )
            );
            setLetters((letters) => merge(letters, currentWord));
            setCurrentRow((currentRow) => currentRow + 1);
            setCurrentWord("");
            return;
          }
        } else if (
          key.toUpperCase() >= "A" &&
          key.toUpperCase() <= "Z" &&
          key.length == 1
        ) {
          // console.log(keyCode);
          setCurrentWord((currentWord) => currentWord + key.toUpperCase());
        } else return;
      }
    },
    [currentRow, currentWord, statu]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (guesses[currentRow - 1] == solution.toUpperCase()) {
      setStatu("you won ");
      setload("loading...");
      setTimeout(function () {
        location.reload();
      }, 3000);
    }
    if (currentRow > 5) {
      setStatu("you lose ");
      setload("loading...");
      setTimeout(function () {
        location.reload();
      }, 3000);
    }
  }, [guesses, currentRow, solution, statu]);
  return (
    <>
      <h1>{statu}</h1>
      <h3>{load}</h3>
      <div className="app">
        {solution.toUpperCase()}
        <Board
          guesses={guesses}
          currentRow={currentRow}
          currentWord={currentWord}
          solution={solution}
        />
        <Keyboard
          letters={letters}
          solution={solution}
          guesses={guesses}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
}

export default App;
