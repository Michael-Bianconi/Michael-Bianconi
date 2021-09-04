import {selectRandom} from "../general/RandomUtils";

/**
 * Snake game model.
 */
export default class Snake {

    /**
     * @param width Width of the game (in tiles).
     * @param height Height of the game (in tiles).
     * @param onEat Function called when the apple is eaten.
     * @param onLose Function called when the game is lost.
     * @constructor
     */
    constructor(width, height, onEat, onLose) {

        let head = {x: Math.floor(width / 4), y: Math.floor(height / 2)};

        this.width = width;
        this.height = height;
        this.direction = RIGHT;
        this.prevDirection = RIGHT;
        this.onEat = onEat;
        this.onLose = onLose;
        this.body = [head, {x: head.x - 1, y: head.y}];
        this.apple = {x: 3 * Math.floor(width / 4), y: Math.floor(height / 2)};
        this.lost = false;
    }

    up = () => {
        if (this.prevDirection !== DOWN) {
            this.direction = UP;
        }
    }

    left = () => {
        if (this.prevDirection !== RIGHT) {
            this.direction = LEFT;
        }
    }

    right = () => {
        if (this.prevDirection !== LEFT) {
            this.direction = RIGHT;
        }
    }

    down = () => {
        if (this.prevDirection !== UP) {
            this.direction = DOWN;
        }
    }

    tick = () => {
        let head = this.body[0];
        let newHead = {x: head.x + this.direction.x, y: head.y + this.direction.y};

        this.prevDirection = this.direction;

        // Check lose condition
        if (this.lost || this.checkCollision(newHead)) {
            this.lost = true;
            this.onLose();
        } else {
            // Move snake
            this.body.unshift(newHead);

            // If not eating, remove tail. Else, generate new apple
            if (newHead.x !== this.apple.x || newHead.y !== this.apple.y) {
                this.body.pop();
            } else {
                this.apple = this.generateApple();
                this.onEat();
            }
        }
    }

    /**
     * Checks if the head is at the given positions.
     * @param row
     * @param col
     * @returns {boolean}
     */
    headAtLocation = (row, col) => {
        return this.body[0].x === col && this.body[0].y === row;
    }

    /**
     * Checks if any body part, including the head, is at the given position.
     * @param row
     * @param col
     * @returns {boolean}
     */
    bodyPartAtLocation = (row, col) => {
        for (let part of this.body) {
            if (row === part.y && col === part.x) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if the apple is at the given position.
     * @param row
     * @param col
     * @returns {boolean}
     */
    appleAtLocation = (row, col) => {
        return this.apple.x === col && this.apple.y === row;
    }

    /**
     * Checks if the new head has collided with the walls or itself.
     * @param head x: number, y: number
     * @returns {boolean} True if collision, false otherwise.
     */
    checkCollision = (head) => {
        // Check walls
        if (head.x < 0 || head.x >= this.width || head.y < 0 || head.y >= this.height) {
            return true;
        }

        // Check self
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }

        return false;
    }

    /**
     * Checks if the game has been won.
     * @returns {boolean}
     */
    checkWin = () => {
        return this.body.length === this.width * this.height;
    }

    /**
     * Generates a new apple somewhere on the grid.
     * @returns {object} x: number, y: number
     */
    generateApple = () => {
        let possible = [];
        for (let x = 0; x < this.width; x++) {
            nextSpace: for (let y = 0; y < this.height; y++) {
                for (let part of this.body) {
                    if (x === part.x && y === part.y) {
                        continue nextSpace;
                    }
                    possible.push({x: x, y: y});
                }
            }
        }
        return selectRandom(possible, () => true, 1)[0];
    }
}

const LEFT = {x: -1, y: 0};
const RIGHT = {x: 1, y: 0};
const UP = {x: 0, y: -1};
const DOWN = {x: 0, y: 1};