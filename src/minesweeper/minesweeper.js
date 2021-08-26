import {selectRandom2d} from "../general/RandomUtils";

export default class MineSweeper {

    constructor(width, height, bomb_percent, onFirstReveal, onWin, onLose) {

        this.grid = [];
        this.hasStarted = false;
        this.lost = false;
        this.won = false;
        this.bombCount = 0;
        this.flagCount = 0;
        this.revealedCount = 0;

        this.onFirstReveal = () => this.callIfFunction(onFirstReveal);
        this.onWin = () => this.callIfFunction(onWin);
        this.onLose = () => this.callIfFunction(onLose);

        // Populate grid with bombs
        for (let row = 0; row < height; row++) {
            this.grid.push([]);
            for (let col = 0; col < width; col++) {
                this.grid[row].push({
                    row: row,
                    col: col,
                    revealed: false,
                    flagged: false,
                    bombCount: 0,
                    isBomb: false,
                });
            }
        }

        this.distributeBombs(width * height * bomb_percent);
    }

    height = () => {
        return this.grid.length;
    }

    width = () => {
        return this.grid[0].length;
    }

    finished = () => {
        return this.won || this.lost;
    }

    bombsRemaining = () => {
        return this.bombCount - this.flagCount;
    }

    getSpace = (row, col) => {
        return this.grid[row][col];
    }

    reveal = (space) => {

        // The first reveal should never lose, so redistribute nearby bombs
        if (!this.hasStarted) {
            this.distributeBombs(this.clearNearbyBombs(space));
            this.hasStarted = true;
            this.onFirstReveal();
        }

        // Keep track of how many spaces are revealed
        if (!space.revealed) {
            space.revealed = true;
            this.revealedCount++;
            if (space.flagged) {
                this.toggleFlag(space);
            }
        }

        // Revealed a bomb, game over
        if (space.isBomb) {
            this.lost = true;
            this.onLose();

        // If this space has no neighboring bombs, reveal all neighbors
        } else if (space.bombCount === 0) {
            this.forEachNeighbor(space, (neighbor) => {
                if (!neighbor.revealed) {
                    this.reveal(neighbor);
                }
            });
        }

        // Check for win
        if (this.revealedCount === this.width() * this.height() - this.bombCount) {
            this.won = true;
            this.onWin();
        }
    }

    toggleFlag = (space) => {
        this.flagCount += space.flagged ? -1 : +1;
        space.flagged = !space.flagged;
    }

    /**
     * Clears all bombs in and around the given space.
     * Does NOT update the bomb counts.
     * @param space The space to clear.
     * @return The number of bombs cleared.
     */
    clearNearbyBombs = (space) => {
        let bombsCleared = space.isBomb ? 1 : 0;

        space.isBomb = false;
        this.forEachNeighbor(space, (neighbor) => {
            if (neighbor.isBomb) {
                bombsCleared++;
                neighbor.isBomb = false;
            }
        });

        return bombsCleared;
    }

    distributeBombs = (numBombs) => {
        for (let bombSite of selectRandom2d(this.grid, s => s.isBomb === false, numBombs)) {
            bombSite.isBomb = true;
        }
        this.updateBombCounts();
    }

    updateBombCounts = () => {
        this.bombCount = 0;
        for (let row of this.grid) {
            for (let col of row) {
                if (col.isBomb) {
                    this.bombCount++;
                }
                col.bombCount = 0;
                this.forEachNeighbor(col, (space) => {
                    if (space.isBomb) {
                        col.bombCount++;
                    }
                });
            }
        }
    }

    forEachNeighbor = (space, func) => {
        let start_y = Math.max(space.row - 1, 0);
        let end_y = Math.min(space.row + 1, this.grid.length - 1);
        let start_x = Math.max(space.col - 1, 0);
        for (let r = start_y; r <= end_y; r++) {
            for (let c = start_x; c <= Math.min(space.col + 1, this.grid[r].length - 1); c++) {
                if (r !== space.row || c !== space.col) {
                    func(this.getSpace(r, c));
                }
            }
        }
    }

    callIfFunction = (func) => {
        if (typeof func === "function") {
            func();
        }
    }
}