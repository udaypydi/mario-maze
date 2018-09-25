import React, { Component } from 'react';
import LandingPage from '../LandingPage';
import './mario.css';
import { EventEmitter } from 'events';

class Mario extends Component {
  state = {
    mushroomPosition: [],
  	marioPosition: {
    	x: 0,
      y: 0,
    },
    maxRow: 12,
    maxColumn: 12,
    points: 0,
    moves: 0,
    isGameStarted: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, false);
  }

  generateRandomMushroomPosition = () => {
    const mushroomPosition = [];
    let positionString = '';
    const { maxColumn, maxRow, isGameStarted } = this.state;
    for (let i = 0; i < maxRow; i ++) {
      const x = parseInt(maxRow * Math.random());
      for (let j = 0; j < maxColumn ; j ++) {
        const y =  parseInt(maxColumn * Math.random());
        
        if (mushroomPosition.indexOf(`${x} ${y}`) === -1 && (x + y !== 0) && mushroomPosition.length <= maxRow) {
          positionString = `${x} ${y}`;
          mushroomPosition.push(positionString);
          break;
        }
      }
    }
    this.setState({ mushroomPosition, isGameStarted: true });
  }

  handleKeyDown = (event) => {
    let {
       marioPosition,
       mushroomPosition, 
       points, 
       moves,
       maxColumn,
       maxRow
    } = this.state;

    let x, y;
    
    switch (event.keyCode) {
      case 39:
        if (marioPosition.x === maxRow - 1) {
          x = marioPosition.x % (maxRow - 1);
        } else {
          x = (marioPosition.x % ( maxRow - 1)) + 1;
        }
        marioPosition = { ...marioPosition, x };
        moves ++;
        break;

      case 37:
        if (marioPosition.x === 0) {
          x = maxRow - 1;
        } else {
          x = marioPosition.x % maxRow - 1;
        }
        marioPosition = { ...marioPosition, x };
        moves ++;
        break;

      case 40:
        if (marioPosition.y === maxColumn - 1) {
          y = (marioPosition.y % (maxColumn - 1));
        } else {
          y = marioPosition.y % maxColumn + 1;
        }
        marioPosition = { ...marioPosition, y };
        moves ++;
        break;

      case 38:
        if (marioPosition.y === 0) {
          y = maxColumn - 1;
        } else {
          y = marioPosition.y % maxColumn - 1;
        }
        marioPosition = { ...marioPosition, y };
        moves ++;
        break;

      default:
        break;  
    }

    const index = mushroomPosition.indexOf(`${marioPosition.x} ${marioPosition.y}`);

    if (index !== -1 && mushroomPosition.length > 0) {
      mushroomPosition.splice(index, 1);
      points += 1;
    }

    this.setState({ marioPosition, mushroomPosition, points, moves });
  };

  renderGridCell = (index) => {
    const { marioPosition, maxColumn, mushroomPosition } = this.state;
    const gridCellsArray = [];
    for (let i = 0; i < maxColumn; i ++) {
      gridCellsArray.push(
      <div className='grid-element'>
        {index === marioPosition.y && i == marioPosition.x &&
          <img src={'https://www.mariowiki.com/images/thumb/9/94/MushroomMarioKart8.png/200px-MushroomMarioKart8.png'} height={30} width={30} />
        }
        {mushroomPosition.indexOf(`${i} ${index}`) !== -1 &&
          <img src='https://vignette.wikia.nocookie.net/nintendo/images/1/12/1upshroom.png/revision/latest?cb=20160922033647&path-prefix=en' height={30} width={30} />
        }
      </div>
      );
    }
    return gridCellsArray;
  }
  
  renderMarioGrid = () => {
    const { maxRow } = this.state;
  	const gridArray = [];
    for (let i = 0; i < maxRow; i ++) {
    	gridArray.push(
      	<div className='horizontal-container'>
          {this.renderGridCell(i)}
        </div>
      )
    }
    return gridArray;
  }

  renderMushroom = (x, y) => {
    const { mushroomPosition } = this.state;
    const obj = {x, y};
    const index = mushroomPosition.indexOf(obj);
    if (index !== - 1) {
      return <p>Mushroom</p>
    }
  }
  
  setMazeHeight = (event) => {
    this.setState({ maxColumn: event.target.value });
  };

  setMazeWidth = (event) => {
    this.setState({ maxRow: event.target.value });
  };

  startGame = () => {
    const { maxRow, maxColumn } = this.state;
    if (maxRow > 0 && maxColumn > 0) {
      this.generateRandomMushroomPosition();
    } else {
      window.alert('Please provide a valid data');
    }
  }
  
  render() {
    const { mushroomPosition, points, maxRow, moves, isGameStarted } = this.state;
    return (
     <div>
       {isGameStarted ?
          <div>
            {mushroomPosition && mushroomPosition.length > 0 &&
              this.renderMarioGrid()
            }
            {mushroomPosition.length === 0 && points > 0 &&
                <h1>Total Moves : {moves}</h1>
            }
          </div> : 
          <LandingPage 
            setMazeHeight={this.setMazeHeight}
            setMazeWidth={this.setMazeWidth}
            startGame={this.startGame}
          />
       }
     </div>
    )
  }
}

export default Mario;
