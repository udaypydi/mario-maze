import React from 'react';
import PropTypes from 'prop-types';
import './landing.css';

const LandingPage = (props) => {
  LandingPage.propTypes = {
    setMazeHeight: PropTypes.func,
    setMazeWidth: PropTypes.func,
    startGame: PropTypes.func,
  };

  return (
    <div>
      <h1>Welcome to Mario mushroom game</h1>
      <div>
        <label>Enter width of the maze: </label>
        <input type='number' onChange={props.setMazeWidth}/>
      </div>
      <div>
        <label>Enter height of the maze: </label>
        <input type='number' onChange={props.setMazeHeight}/>
      </div>
      <button onClick={props.startGame}>Play Now</button>
    </div>
  )
};

export default LandingPage;

