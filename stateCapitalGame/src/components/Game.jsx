import React, { useEffect, useState } from "react";
import _ from "lodash";
import classnames from "classnames";

const Game = ({ data }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState([]);
  const [matched, setMatched] = useState(new Set());

  useEffect(function onMount() {
    const allOptions = Object.entries(data).flat();

    setOptions(_.shuffle(allOptions));
  }, []);

  const handleSelection = (e) => {
    const { target } = e;
    const value = target.getAttribute("data-value");

    console.log({ value });

    const newSelection = selectedOption.concat(value);

    if (newSelection.length === 2) {
      // checking
      const [first, second] = newSelection;

      if (data[first] === second || data[second] === first) {
        setCorrectOption(newSelection);
        setTimeout(() => {
          setMatched(new Set([...matched, ...newSelection]));
          setCorrectOption([]);
          setSelectedOptions([]);
        }, 1000);
      } else {
        setSelectedOptions(newSelection);
        setTimeout(() => {
          setSelectedOptions([]);
        }, 1000);
      }
    } else {
      setSelectedOptions(newSelection);
    }
  };

  if (matched.size === options.length) {
    return (
      <div className="w-screen h-screen flex  items-center justify-center bg-slate-900">
        <h1 className="text-4xl font-medium text-white">
          🍾🍾.....Congratilations ....🎉🎉
        </h1>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center bg-slate-900">
      <h1 className="mb-5 text-4xl text-white">
        🤔 Guess the State Capital 🗺️
      </h1>
      <div className="w-[600px] h-[255px] flex items-center justify-center gap-3 flex-wrap">
        {options.map((option) => {
          if (matched.has(option)) return null;

          const isSelected =
            selectedOption.includes(option) || correctOption.includes(option);
          const isCorrect = correctOption.includes(option);
          const isIncorrect =
            selectedOption.length === 2 && isSelected && !isCorrect;
          return (
            <button
              className={classnames(
                "px-4 py-3 bg-blue-700 text-white rounded-md",
                isSelected && `bg-slate-200 text-black`,
                isIncorrect && "bg-red-600 !text-white",
                isCorrect && "bg-green-600 !text-white"
              )}
              key={option}
              onClick={handleSelection}
              data-value={option}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
