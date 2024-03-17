import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { words } from "./Words.jsx";
import Board from "./Board.jsx";
import Keyboard from "./Keyboard.jsx";

const merge = (letters, word) => {
  return Array.from(new Set(letters + word)).join("");
};
console;
function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(new Array(6).fill(""));
  const [currentWord, setCurrentWord] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [letters, setLetters] = useState("");
  // const [gameStatues, setGameStatues] = useState('');

  const selectWord = () => {
    setSolution(words[Math.floor(Math.random() * words.length)]);
  };

  useEffect(() => {
    selectWord();
  }, []);
  const handleKeyDown = useCallback(
    (e) => {
      let status = document.getElementsByTagName("h1")[0].innerHTML;
      if (status == "") {
        const { key, keyCode } = e;
        if (keyCode === 8 && currentWord.length > 0) {
          setCurrentWord((currentRow) => currentRow.slice(0, -1));
        }
        if (currentWord.length === 5) {
          if (keyCode !== 13) return;
          else {
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
        }
        if (keyCode >= 65 && keyCode < 91) {
          setCurrentWord((currentWord) => currentWord + key.toUpperCase());
        }
      } else {
        setInterval(function () {
          document.getElementsByTagName("h1")[0].innerHTML += ".";
        }, 1000);
        setTimeout(function () {
          location.reload();
        }, 4000);
      }
    },
    [currentRow, currentWord]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (guesses[currentRow - 1] == solution.toUpperCase()) {
      // console.log("you won");
      // console.log();
      document.getElementsByTagName("h1")[0].innerHTML = `you won `;
    }
    if (currentRow > 5) {
      document.getElementsByTagName("h1")[0].innerHTML = `you lose `;
    }
  }, [guesses, currentRow, solution]);
  return (
    <>
      <h1></h1>
      <div className="app">
        {solution.toUpperCase()}
        <Board
          guesses={guesses}
          currentRow={currentRow}
          currentWord={currentWord}
          solution={solution}
        />
        <Keyboard letters={letters} solution={solution} guesses={guesses} />
      </div>
    </>
  );
}

export default App;
