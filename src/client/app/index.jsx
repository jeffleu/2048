import React, { Component } from 'react';
import { render } from 'react-dom';
import { Board, Buttons } from './components';
import {
  placeRandom,
  getInitialState,
  moveUp,
  moveRight,
  moveDown,
  moveLeft,
  boardMoved,
  checkForGameOver,
  continueOrEndGame
} from './utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      board: null,
      score: 0,
      gameOver: false,
      message: null
    };

    this.startGame = this.startGame.bind(this);
    this.move = this.move.bind(this);
  }
  
  startGame(n) {
    this.setState(getInitialState(n));
  }
    
  // Moves board depending on direction and checks for game over
  move(direction) {
    if (!this.state.gameOver) {
      if (direction === 'up') {
        const movedUp = moveUp(this.state.board);
        if (boardMoved(this.state.board, movedUp.board)) {
          const upWithRandom = placeRandom(movedUp.board);
          this.setState(continueOrEndGame(upWithRandom, this.state.score + movedUp.score));
        }
      } else if (direction === 'right') {
        const movedRight = moveRight(this.state.board);
        if (boardMoved(this.state.board, movedRight.board)) {
          const rightWithRandom = placeRandom(movedRight.board);
          this.setState(continueOrEndGame(rightWithRandom, this.state.score + movedRight.score));
        }
      } else if (direction === 'down') {
        const movedDown = moveDown(this.state.board);
        if (boardMoved(this.state.board, movedDown.board)) {
          const downWithRandom = placeRandom(movedDown.board);
          this.setState(continueOrEndGame(downWithRandom, this.state.score + movedDown.score));
        }
      } else if (direction === 'left') {
        const movedLeft = moveLeft(this.state.board);
        if (boardMoved(this.state.board, movedLeft.board)) {
          const leftWithRandom = placeRandom(movedLeft.board);
          this.setState(continueOrEndGame(leftWithRandom, this.state.score + movedLeft.score));
        }
      }
    } else {
      this.setState({ message: 'Game over. Please start a new game.' });
    }
  }
  
  componentWillMount() {
    this.startGame(4);
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  
  handleKeyDown(e) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37
    const n = 78;
    
    if (e.keyCode === up) {
      this.move('up');
    } else if (e.keyCode === right) {
      this.move('right');
    } else if (e.keyCode === down) {
      this.move('down');
    } else if (e.keyCode === left) {
      this.move('left');
    } else if (e.keyCode === n) {
      this.startGame(4);
    }
  }
    
  render() {
    return (
      <div>        
        <Buttons startGame={this.startGame} move={this.move}/>
        <Board board={this.state.board} score={this.state.score}/>
        <p>{this.state.message}</p>
      </div>
    );
  }
};

render(<App />, document.getElementById('app'));
