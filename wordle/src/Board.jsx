import PropTypes from "prop-types";
const getColors = (solution, word) => {
  const finalresult = solution.toUpperCase().split("");

  for (let i = 0; i < word.length; i++) {
    if (word[i] === finalresult[i]) {
      finalresult[i] = "*";
    }
  }

  for (let i = 0; i < solution.length; i++) {
    const indx = finalresult.indexOf(word[i]);
    if (indx > -1 && finalresult[indx] !== "*" && finalresult[indx] !== "+") {
      finalresult[i] = "+";
      finalresult[indx] = "+";
      console.log(solution[indx]);
    }
  }
  return finalresult.map((letter) => {
    if (letter === "*") return "correct";
    if (letter === "+") return "semi-correct";
    return "wrong";
  });
};

const Row = ({ word, isFinished, solution }) => {
  const colors = isFinished ? getColors(solution, word) : new Array(5).fill("");
  return new Array(5).fill("").map((_, indx) => (
    <div className={`board-cell ${colors[indx]}`} key={indx}>
      {word[indx] ?? ""}
    </div>
  ));
};

const Board = ({ guesses, currentRow, currentWord, solution }) => (
  <div className="board">
    {guesses.map((_, rowIndx) => (
      <div key={rowIndx} className="board-row">
        <Row
          word={currentRow === rowIndx ? currentWord : guesses[rowIndx]}
          isFinished={currentRow > rowIndx}
          solution={solution}
        />
      </div>
    ))}
  </div>
);
Board.propTypes = {
  guesses: PropTypes.arrayOf(PropTypes.string),
  currentRow: PropTypes.number,
  currentWord: PropTypes.string,
  solution: PropTypes.string,
};

export default Board;
