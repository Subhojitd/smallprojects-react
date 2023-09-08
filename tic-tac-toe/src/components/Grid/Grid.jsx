import React, { useState } from "react";
import Card from "../Card/Card";
import isWinner from "../../helpers/checkWinner";

const Grid = ({ numOfCards }) => {


  const [board, setBoard] = useState(Array(numOfCards).fill(""));
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState(null);


  function play(index) {
    if (turn == true) {
      board[index] = "O";
    } else {
      board[index] = "X";
    }
    const win = isWinner(board, turn ? "O" : "X");
    if (win) {
      setWinner(win);
    }
    setBoard([...board]);
    setTurn(!turn);
  }

  function reset(){
    setTurn(true)
    setWinner(null)
    setBoard(Array(numOfCards).fill(""))
  } 
  
  return (
    <div className="text-3xl border-2 my-2 border-yellow-300 p-4 flex flex-col justify-center items-center">
      {winner && <>
        <h1 className="text-white text-center my-2"> Winner is : {winner}</h1>
        
      </>}
      <h1 className="text-white text-center   my-2">
        Current Turn: {turn ? "O" : "X"}
      </h1>
      <div className="h-[500px] w-[500px] flex flex-wrap gap-5  justify-center items-center">
        {board.map((el, i) => (
          <Card key={i} gameEnd={winner ? true : false} onPlay={play} player={el} index={i} />
        ))}
      </div>
      <button onClick={reset} className="bg-blue-200 p-2 rounded-lg text-center ">Reset Game</button>
    </div>
  );
};

export default Grid;
