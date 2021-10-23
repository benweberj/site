
/**
 * Classic Snake game
 * The board is represented in terms of the tile index, not pixel pos
 *    - (snake[n].x|y < cellSize)
 */

import { generateParameters, updateParameters  } from './utils'

export const snakeInfo = {
  name: 'Snake',
  description: 'Yeah, its snake',
  settings: {
    frameRate: {
       value: 10,
       name: 'Frame Rate',
       description: 'How many frames to render each second',
    },
    rows: {
       value: 20,
       name: 'Rows',
    },
    cols: {
       value: 20,
       name: 'Columns',
    },
    cellSize: {
       value: 20,
       name: 'Cell Size (px)',
    },
    reward: {
       value: 1,
       name: 'Reward',
       description: 'How many blocks to add to the snake when food is eaten',
    },
    retro: {
       value: false,
       name: 'Retro',
       description: 'Use original Snake game\'s color scheme',
    },
    selfDestruct: {
       value: true,
       name: 'Self Destruct',
       description: 'Snake dies when head overlaps with its body',
    },
    wrapAround: {
       value: true,
       name: 'Wrap Around',
       description: 'Snake wraps around to the opposite edge instead of dying',
    },
  }
}

export default p => {
   let canvas; // p5 canvas object
   let fruit; // coordinates of fruit
   let snake; // array of points representing snake trail
   let dirQueue = ['left']; // direction
   let dir = dirQueue[0]
   let gameOver = false;
   let deathIndex = 0 // the skeleton effect will fllow through the body
   let score = 0;

   const defaultParams = generateParameters(snakeInfo.settings)
   let params = JSON.parse(JSON.stringify(defaultParams)) // simple deep copy

   let restartBtn = p.createButton('Play again?');

   const startSnakeBlock = () => {
      if (params.retro) {
         p.noStroke();
         p.fill(0, 255, 0);
      } else {
         p.stroke(255);
         p.fill("#77c9ae");
      }
   }
   const startSnakeHeadBlock = () => {
      if (params.retro) {
         p.noStroke();
         p.fill(0, 255, 0);
      } else {
         p.stroke(255);
         p.fill("#55bb99");
      }
   }
   const startCellBlock = () => {
      if (params.retro) {
         p.noStroke();
         p.fill(0);
      } else {
         p.stroke(240);
         p.fill(255);
      }
   }
   const startFruitBlock = () => {
      if (params.retro) {
         p.fill(255, 0, 0);
      } else {
         p.fill(150);
      }
   }

   const keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40,
   }

   const randInt = (max) => Math.floor(Math.random() * max)
   const spawnFruit = () => fruit = { x: randInt(params.cols), y: randInt(params.rows) };
   const overlapping = (p1, p2) => (p1.x == p2.x && p1.y == p2.y)

   const init = () => {
      const { rows, cols } = params
      spawnFruit();
      snake = [ { x: cols/2, y: rows/2 } ];
      gameOver = false
      score = 0
   }

   const endGame = () => {
      gameOver = true;
   }

   const checkWalls = () => {
      const { wrapAround, cols, rows } = params
      if (snake[0].x == cols) {
         if (wrapAround) snake[0].x = 0; else endGame();
      }
      if (snake[0].x == -1) {
         if (wrapAround) snake[0].x = cols-1; else endGame();
      }
      if (snake[0].y == rows) {
         if (wrapAround) snake[0].y = 0; else endGame();
      }
      if (snake[0].y == -1) {
         if (wrapAround) snake[0].y = rows-1; else endGame();
      }
   }

   const logic = () => {
      if (gameOver) return;
      const { selfDestruct, reward } = params

      if (selfDestruct) { // can't touch your trail
         for (let i = 1; i < snake.length; i++) {
            if (overlapping(snake[0], snake[i])) {
               endGame();
               return;
            }
         }
      }

      if (overlapping(snake[0], fruit)) {
         spawnFruit();
         for (let i = 0; i < reward; i++) {
            snake.push({ x: -1, y: -1 });
            score++
         }
      }

      for (let i = snake.length-1; i >= 1; i--) {
         snake[i].x = snake[i-1].x;
         snake[i].y = snake[i-1].y;
      }

      // get the last key input then clear all the overwritten keypresses
      if (dirQueue.length > 0) {
        dir = dirQueue.pop()
        dirQueue = []
      }
      
      // move head based on dir
      switch(dir) {
         case 'up': snake[0].y--; break;
         case 'down': snake[0].y++; break;
         case 'left': snake[0].x--; break;
         case 'right': snake[0].x++; break;
      }
      checkWalls();
   }

   p.setup = () => {
      const { frameRate, cols, rows, cellSize } = params;
      canvas = p.createCanvas(500, 500);
      p.frameRate(frameRate);
      p.resizeCanvas(cols*cellSize, rows*cellSize);
      restartBtn.position(p.width/2, p.height/2)

      restartBtn.style('padding', '5px 15px')
      restartBtn.style('background', 'white')
      restartBtn.style('border', '1px solid black')
      restartBtn.style('border-radius', '5px')
      restartBtn.mousePressed(init)

      init();
   }

   p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
      // you need to give the sketch component the full settings object, so for ease, just convert it back to a simple map
      const newParams = generateParameters(newProps.settings)
      let resize = (params.cellSize != newParams.cellSize || params.cols != newParams.cols || params.rows != newParams.rows)
      
      params = updateParameters(newParams, params, defaultParams)
      p.frameRate(params.frameRate)
      if (resize) p.resizeCanvas(params.cols*params.cellSize, params.rows*params.cellSize)
   } 

   p.keyPressed = (e) => {
      // add each keystroke to the frame queue. Last input on that frame will be used
      switch(e.keyCode) {
         case keys.up: if (dir != 'down') dirQueue.push('up'); break;
         case keys.down: if (dir != 'up') dirQueue.push('down'); break;
         case keys.left: if (dir != 'right') dirQueue.push('left'); break;
         case keys.right: if (dir != 'left' ) dirQueue.push('right'); break;
      }
   }

   p.draw = () => {
      logic();
      gameOver ? restartBtn.show() : restartBtn.hide()

      const { rows, cols, cellSize } = params
      
      // draw cells
      for (let i = 0; i < rows; i++) {
         for (let j = 0; j < cols; j++) {
            startCellBlock();
            p.rect(j*cellSize, i*cellSize, cellSize, cellSize);
         }   
      }

      // draw snake
      for (let i = 0; i < snake.length; i++) {
         startSnakeBlock();
         if (gameOver && deathIndex >= i) {
            p.fill(200);
            p.rect(snake[i].x*cellSize + cellSize/2 - 3, snake[i].y*cellSize, 6, cellSize);
            p.rect(snake[i].x*cellSize, snake[i].y*cellSize + cellSize/2 - 3, cellSize, 6);
         } else p.rect(snake[i].x*cellSize, snake[i].y*cellSize, cellSize, cellSize);
      }
      if (gameOver) deathIndex++

      // draw fruit
      startFruitBlock();
      p.rect(fruit.x*cellSize + (cellSize/4), fruit.y*cellSize + (cellSize/4), cellSize/2, cellSize/2);

      // draw head (separately so it can be on top of snake & fruit)
      if (!gameOver) {
        startSnakeHeadBlock();
        p.rect(snake[0].x*cellSize, snake[0].y*cellSize, cellSize, cellSize);
      }
   }
}