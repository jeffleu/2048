import React from 'react';

const Buttons = (props) => {
  const { startGame, move } = props;

  return (
    <div>
      <div className="button" onClick={() => {startGame(4)}}>New Game</div>

      <div className="buttons">
        <div className="button" onClick={() => {startGame(6)}}>6 x 6</div>
        <div className="button" onClick={() => {startGame(8)}}>8 x 8</div>
        <div className="button" onClick={() => {startGame(10)}}>10 x 10</div>
      </div>

      <div className="buttons">
        <div className="button" onClick={() => {move('up')}}>Up</div>
        <div className="button" onClick={() => {move('right')}}>Right</div>
        <div className="button" onClick={() => {move('down')}}>Down</div>
        <div className="button" onClick={() => {move('left')}}>Left</div>
      </div>
    </div>
  );
};

export default Buttons;
