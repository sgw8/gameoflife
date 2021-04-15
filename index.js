const canvas = document.querySelector('canvas')

ctx = canvas.getContext('2d')

const resolution = 40
canvas.width = 400
canvas.height = 400

const COLS = canvas.width / resolution
const ROWS = canvas.height / resolution

function buildGrid () {
    return new Array(COLS).fill(null).map(()=>{
       return new Array(ROWS).fill(0)
    })
}

const grid = buildGrid()

render(grid)

function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for(let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row]

            ctx.beginPath()
            ctx.rect(col * resolution, row * resolution, resolution, resolution)
            ctx.stroke()
        }
    }
}