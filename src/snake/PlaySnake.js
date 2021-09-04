import React from "react";
import Snake from "./snake";
import styles from "./Snake.module.css";

/**
 * The view for Snake.
 *
 * Props:
 *      None
 * State:
 *      score: The number of apples eaten.
 *      ready: True when difficulty has been chosen.
 *      speed: The interval speed, determined by difficulty.
 *      intervalId: The intervalId, so it can be cleared later.
 *      snake: The snake game.
 *
 * TODO Win screen
 */
export default class PlaySnake extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            ready: false,
            speed: NaN,
            intervalId: null,
            snake: null,
        };

        this.Board = this.Board.bind(this);
    }

    render() {
        return (
            <div className={styles.MainContainer}>
                <h1 className={styles.title}>Snake</h1>
                {this.state.snake
                    ?
                    <div className={styles.GameContainer}>
                        {this.state.snake.lost ?
                            <div className={styles.gameOverContainer}>
                                <span>Score: {this.state.score}</span>
                                <span>You lost!</span>
                                <button className={styles.Restart} onClick={() => this.restart()}>Restart</button>
                            </div>
                            :
                            <div>
                                <span>Score: {this.state.score}</span>
                            </div>
                        }
                        <span>Use arrow keys to move</span>
                        <this.Board snake={this.state.snake} />
                    </div>
                    :
                    <Setup onClick={(s) => this.ready(s)} />
                }
            </div>
        );
    }

    /**
     * Add an event listener to the document to handle input.
     */
    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            if (this.state.snake) {
                if (this.state.ready) {
                    this.start();
                }
                switch (e.code) {
                    case 'ArrowUp':
                        this.state.snake.up();
                        break;
                    case 'ArrowDown':
                        this.state.snake.down();
                        break;
                    case 'ArrowLeft':
                        this.state.snake.left();
                        break;
                    case 'ArrowRight':
                        this.state.snake.right();
                        break;
                    default: // Do nothing
                }
            }
        });
    }

    /**
     * Clears the interval.
     */
    componentWillUnmount() {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
        }
    }

    /**
     * Creates the Board table.
     * @returns {JSX.Element} The table representing the Board.
     * @constructor
     */
    Board() {
        return (
            <table className={styles.BoardTable}>
                <tbody>
                {[...Array(this.state.snake.height)].map((_, row) =>
                    <tr key={row}>
                        {[...Array(this.state.snake.width)].map((_, col) => {
                            let className;
                            if (this.state.snake.headAtLocation(row, col)) {
                                className = styles.SnakeHead;
                            } else if (this.state.snake.bodyPartAtLocation(row, col)) {
                                className = styles.SnakeBodyPart;
                            } else if (this.state.snake.appleAtLocation(row, col)) {
                                className = styles.Apple;
                            }
                            return <td key={col} className={className}/>;
                        }
                        )}
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    /**
     * Prepares the state for game start. Called after difficulty has been chosen.
     * @param speed Interval speed (milliseconds).
     */
    ready(speed) {

        let onEat = () => {
            let newState = Object.assign({}, this.state);
            newState.score++;
            this.setState(newState);
        }

        let onLose = () => {
            clearInterval(this.state.intervalId);
        }

        this.setState({
            ready: true,
            speed: speed,
            intervalId: null,
            snake: new Snake(13, 13, () => onEat(), () => onLose()),
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

    /**
     * Restarts the game.
     */
    restart() {
        this.setState({
            score: 0,
            ready: false,
            speed: NaN,
            intervalId: null,
            snake: null,
        });
    }
}

/**
 * Creates the difficulty selector.
 * @param props onClick(speed)
 * @returns {JSX.Element}
 * @constructor
 */
function Setup(props) {
    return (
        <div className={styles.setupContainer}>
            <button className={styles.difficultyButton} onClick={() => props.onClick(200)}>Easy</button>
            <button className={styles.difficultyButton} onClick={() => props.onClick(150)}>Medium</button>
            <button className={styles.difficultyButton} onClick={() => props.onClick(100)}>Hard</button>
        </div>
    )
}