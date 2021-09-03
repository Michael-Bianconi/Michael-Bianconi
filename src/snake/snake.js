import {selectRandom} from "../general/RandomUtils";

export default class Snake {

    constructor(width, height, speed) {

        let head = {x: Math.floor(width / 4), y: Math.floor(height / 2)};

        this.width = width;
        this.height = height;
        this.direction = RIGHT;
        this.speed = speed;
        this.body = [head, {x: head.x - 1, y: head.y}];
        this.apple = {x: 3 * Math.floor(width / 4), y: Math.floor(height / 2)};
        this.lost = false;
    }

    up = () => {
        if (this.direction !== DOWN) {
            this.direction = UP;
        }
    }

    left = () => {
        if (this.direction !== RIGHT) {
            this.direction = LEFT;
        }
    }

    right = () => {
        if (this.direction !== LEFT) {
            this.direction = RIGHT;
        }
    }

    down = () => {
        if (this.direction !== UP) {
            this.direction = DOWN;
        }
    }

    tick = () => {
        // Move snake
        let head = this.body[0];
        let newHead = {x: head.x + this.direction.x, y: head.y + this.direction.y};
        this.body.unshift(newHead);

        // If not eating, remove tail. Else, generate new apple
        if (newHead.x !== this.apple.x || newHead.y !== this.apple.y) {
            this.body.pop();
        } else {
            this.apple = this.generateApple();
        }

        if (this.checkCollision()) {
            this.lost = true;
        }
    }

    headAtLocation = (row, col) => {
        return this.body[0].x === col && this.body[0].y === row;
    }

    bodyPartAtLocation = (row, col) => {
        for (let part of this.body) {
            if (row === part.y && col === part.x) {
                return true;
            }
        }
        return false;
    }

    appleAtLocation = (row, col) => {
        return this.apple.x === col && this.apple.y === row;
    }

    checkCollision = () => {
        let head = this.body[0];

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

    checkWin = () => {
        return this.body.length === this.width * this.height;
    }

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