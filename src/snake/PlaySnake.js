import React from "react";
import Snake from "./snake";
import styles from "./Snake.module.css";

export default class PlaySnake extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            speed: NaN,
            intervalId: null,
            snake: null,
        };

        this.Setup = this.Setup.bind(this);
        this.Board = this.Board.bind(this);
    }

    render() {
        if (this.state.snake) {
            if (!this.state.snake.lost) {
                return <this.Board snake={this.state.snake}/>
            } else {
                return <span>You lost</span>
            }
        } else {
            return <this.Setup />
        }
    }


    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            if (this.state.snake) {
                if (this.state.ready) {
                    this.start();
                }
                switch (e.keyCode) {  // TODO
                    case 38:
                        this.state.snake.up();
                        break;
                    case 40:
                        this.state.snake.down();
                        break;
                    case 37:
                        this.state.snake.left();
                        break;
                    case 39:
                        this.state.snake.right();
                        break;
                    default: // Do nothing
                }
            }
        });
    }

    componentWillUnmount() {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
    }

    Board() {
        let getRow = (row) => {
            let tds = [];
            for (let col = 0; col < this.state.snake.width; col++) {
                let className;
                if (this.state.snake.headAtLocation(row, col)) {
                    className = styles.SnakeHead;
                } else if (this.state.snake.bodyPartAtLocation(row, col)) {
                    className = styles.SnakeBodyPart;
                } else if (this.state.snake.appleAtLocation(row, col)) {
                    className = styles.Apple;
                }

                tds.push(<td key={col} className={className}/>);
            }
            return <tr key={row}>{tds}</tr>;
        }

        let getBody = () => {
            let trs = [];
            for (let row = 0; row < this.state.snake.height; row++) {
                trs.push(getRow(row));
            }
            return <tbody>{trs}</tbody>;
        }

        return (
            <table className={styles.BoardTable}>
                {getBody()}
            </table>
        );
    }

    Setup() {
        return (
            <div>
                <span>
                    <button onClick={() => this.onDifficultySelection("EASY")}>Easy</button>
                    <button onClick={() => this.onDifficultySelection("MEDIUM")}>Medium</button>
                    <button onClick={() => this.onDifficultySelection("HARD")}>Hard</button>
                </span>
            </div>
        );
    }

    onDifficultySelection(difficulty) {
        let speed = difficulty === 'EASY' ? 200
            : difficulty === 'MEDIUM' ? 150
                : 100;

        this.ready(new Snake(13, 13), speed);
    }

    ready(snake, speed) {
        this.setState({
            ready: true,
            speed: speed,
            intervalId: null,
            snake: snake,
        });
    }

    /**
     * Starts the game.
     * @pre this.state.snake is a Snake
     * @pre this.state.speed is a number
     * @pre the game has not already started
     * @post this.state.ready is false
     * @post this.state.intervalId is a number
     */
    start() {
        let onTick = () => {
            this.state.snake.tick();
            this.forceUpdate();
        }

        this.setState({
            ready: false,
            speed: this.state.speed,
            intervalId: setInterval(() => onTick(), this.state.speed),
            snake: this.state.snake,
        });
    }
}

// TODO win
// TODO styling