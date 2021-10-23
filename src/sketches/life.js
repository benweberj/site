import { generateParameters, updateParameters } from "./utils"

export const lifeInfo = {
   name: 'Conway\s Game of Life',
   description: '...',
   settings: {
      haha: {
         name: 'haha',
         value: 999,
         description: '' 
      },
      rows: {
         name: 'Rows',
         value: 10,
      },
      cols: {
         name: 'Columns',
         value: 10,
      },
      cellSize: {
         name: 'Cell size',
         value: 40,
      },

   }
}

export default p => {
   let canvas;
   let running = false;
   let board = [];
   let paused = true;

   const defaultParams = generateParameters(lifeInfo.settings)
   let params = JSON.parse(JSON.stringify(defaultParams))

   class Cell {
      constructor(x, y) {
         this.x = x;
         this.y = y;
         this.alive = false;
      }

      kill = () => this.alive = false;
      birth = () => this.alive = true;
      toggle = () => this.alive = !this.alive;
      
      draw = () => {
         let xx = this.x * params.cellSize;
         let yy = this.y * params.cellSize;
         p.stroke(this.alive ? 255 : 0);
         p.fill(this.alive ? 0 : 255);
         p.rect(xx, yy, xx+params.cellSize, yy+params.cellSize);
      }
   }

   const resize = () => {
      const { cellSize, cols, rows } = params;
      p.resizeCanvas(cols*cellSize, rows*cellSize);
   }

   const initBoard = () => {
      const { cellSize, rows, cols } = params;
      board = []
      for (let i = 0; i < rows; i++) {
         let row = [];
         for (let j = 0; j < cols; j++) {
            row.push(new Cell(j, i));
         }
         board.push(row);
      }
      render();
   }

   const flag = (row, col, birth) => {
      console.log('flag');
      let cell = board[row][col];
      p.fill(birth ? '#00ff00' : '#ff0000');
      p.noStroke();
      p.rect(params.cellSize*cell.x + params.cellSize/2 - 10, params.cellSize*cell.y + params.cellSize/2 - 10, 20, 20);
   }

   const step = () => {
      console.log('step');
      let toKill = []
      let toBirth = []
      board.forEach((row, i) => {
         row.forEach((cell, j) => {
            let n = countLiveNeighbors(i, j)
            if (willBeKilled(i, j)) toKill.push(cell);
            else if (willBeBorn(i, j)) toBirth.push(cell)
         });
         toKill.forEach(cell => cell.kill())
         toBirth.forEach(cell => cell.birth())
      })
   }

   const willBeKilled = (row, col) => {
      let n = countLiveNeighbors(row, col)
      return board[row][col].alive && (n < 2|| n > 3) 
   }

   const willBeBorn = (row, col) => {
      let n = countLiveNeighbors(row, col)
      return !board[row][col].alive && n===3
   }

   

   // displays current state (alive, aliveNeighbors, willBeKilled) of each cell
   const render = () => {
      console.log('render');
      board.forEach((row, r) => {
         row.forEach((cell, c) => {
            cell.draw();

            if (willBeKilled(r, c)) flag(r,c, false);
            if (willBeBorn(r, c)) flag(r,c, true);

            showLiveNeighborCounts()
         });
      });
   }

   const countLiveNeighbors = (row, col) => {
      return [
         (board[row-1] && board[row-1][col-1]) || null, // top left
         (board[row-1] && board[row-1][col]) || null, // top
         (board[row-1] && board[row-1][col+1]) || null, // top right
         board[row][col-1] || null, // left
         board[row][col+1] || null, // right
         (board[row+1] && board[row+1][col-1]) || null, // bottom left
         (board[row+1] && board[row+1][col]) || null, // bottom
         (board[row+1] && board[row+1][col+1]) || null, // bottom right
      ].filter(cell => cell != null && cell.alive).length
   }

   const showLiveNeighborCounts = () => {
      board.forEach((row, r) => {
         row.forEach((cell, c) => {
            let n = countLiveNeighbors(r, c);
            p.fill(0)
            p.stroke(255);
            if (n > 0) p.text(n, params.cellSize*cell.x + params.cellSize/2.5, params.cellSize * cell.y + params.cellSize/1.5)
         });
      });   
   }

   // const showCellFates = () => {
   //    console.log('showing cell fates')
   //    board.forEach((row, i) => {
   //       row.forEach((cell, j) => {
   //          let n = countLiveNeighbors(i, j)
   //          if (cell.alive && (n < 2 || n > 3)) { // under and over population
   //             flag(i, j, false)
   //          } else if (!cell.alive && n == 3) { // reproduction
   //             flag(i, j, true)
   //          }
   //       });
   //    });
   // }

   p.setup = () => {
      canvas = p.createCanvas(500, 500);
      p.background(0);
      resize();
      initBoard();
      
      render();
   }

   p.keyPressed = e => {
      if (e.keyCode == 32) { // space
         step();
         render()
      }
      // if (e.keyCode == 32) {
      //    paused = !paused;
      // }
      if (e.keyCode == 8) { // backspace
         initBoard();
         paused = true;
      }
   }
   
   p.draw = () => {
      // p.fill(0)
      // p.textSize(20)
      // p.text(paused ? 'Paused' : 'Running...', p.width-100, 30)
   }

   p.mouseClicked = () => {
      if (p.mouseX == 0 && p.mouseY == 0) return;
      let x = Math.floor(p.mouseX / params.cellSize);
      let y = Math.floor(p.mouseY / params.cellSize);
      if(board[y] && board[y][x]) board[y][x].toggle();
      
      // step();
      render();
   }

   p.myCustomRedrawAccordingToNewPropsHandler = () => {
      
   }
}
