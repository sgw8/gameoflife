const canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");

//  resolution setup
const resolution = 10;
canvas.width = 450;
canvas.height = 450;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

// build grid
function buildGrid() {
  return new Array(COLS).fill(null).map(() => {
    return new Array(ROWS).fill(null).map(() => {
      //    random initial positions on the grid
      return Math.floor(Math.random() * 2);
    });
  });
}

let grid = buildGrid();

requestAnimationFrame(update);

function update() {
  // updateto the next generation
  grid = nextGeneration(grid);
  render(grid);
  requestAnimationFrame(update);
}

// creating new gen with rules
function nextGeneration(grid) {
  const nextGen = grid.map((arr) => {
    return [...arr];
  });

  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let numNeighbors = 0;

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }

          const x_cell = col + i;
          const y_cell = row + j;

          if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
            const currentNeighbor = grid[col + i][row + j];
            numNeighbors += currentNeighbor;
          }
        }
      }

      /* RULES */

      // if less than 2 neighbors then die
      if (cell === 1 && numNeighbors < 2) {
        nextGen[col][row] = 0;
      }
      // if neightbors more than 3 then die cause of overpopulation
      else if (cell === 1 && numNeighbors > 3) {
        nextGen[col][row] = 0;
      }
      // if neighbors equal 3 so then alive
      else if (cell === 0 && numNeighbors === 3) {
        nextGen[col][row] = 1;
      }
    }
  }

  return nextGen;
}

function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      ctx.beginPath();
      ctx.rect(col * resolution, row * resolution, resolution, resolution);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();

      // borders
      ctx.stroke();
    }
  }
}
