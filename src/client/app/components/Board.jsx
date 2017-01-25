import React from 'react';
import { Row } from '../components';

const Board = (props) => {
  const { board, score } = props;

  return (
    <div className="board-container">
      <div className="score">Score: { score }</div>
      <table>
        <tbody>
          { board.map((row, i) => (<Row key={i} row={row} />)) }
        </tbody>
      </table>
    </div>
  );
};

export default Board;
