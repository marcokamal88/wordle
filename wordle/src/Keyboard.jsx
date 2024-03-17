import PropTypes from "prop-types";

const rows = ["QWERTYUIOP", "ASDFGHJKL", "+ZXCVBNM-"];
const getColor = (solution, letter, guesses) => {
  const indx = solution.toUpperCase().indexOf(letter.toUpperCase());
  if (indx === -1) return "wrong";
  if (guesses.find((guess) => guess[indx] === letter)) return "correct";
  return "semi-correct";
};

const Keyboard = ({ solution, letters, guesses }) => (
  <div className="keyboard">
    {rows.map((row, rowIdx) => (
      <div key={rowIdx} className="keyboard-row">
        {row.split("").map((letter, letterIdx) => (
          <div
            key={letterIdx}
            className={`keyboard-letter ${
            letters.includes(letter) && getColor(solution, letter, guesses)}`
            }>
            {letter === "+" ? "Enter" : letter === "-" ? "Delete" : letter}
          </div>
        ))}
      </div>
    ))}
  </div>
);
Keyboard.propTypes = {
  solution: PropTypes.string,
  letters: PropTypes.string,
  guesses: PropTypes.arrayOf(PropTypes.string),
};

export default Keyboard;
