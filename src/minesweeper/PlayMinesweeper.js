import React, {createRef} from "react";
import MineSweeper from "./minesweeper";
import styles from "./Minesweeper.module.css";
import TimerBox from "../general/TimerBox";
import RestartButton from "../general/RestartButton";
import FlagImg from "./flag.png";
import BombImg from "./bomb.png";

export default class PlayMinesweeper extends React.Component {

    constructor(props) {
        super(props);
        this.timerRef = createRef();
        this.state = {
            started: false,
            won: false,
            game: null,
            bombsRemaining: -1
        };
    }

    render() {
        return (
            <div className={styles.MainContainer}>
                <h1 className={styles.title}>Minesweeper</h1>
                {!this.state.started
                    ? <Setup onClick={(w, h, b) => this.start(w, h, b)}/>
                    :
                    <div className={styles.GameContainer}>
                        <div className={styles.AdminBar}>
                            <span className={styles.BombsRemaining}>{this.state.bombsRemaining}</span>
                            <TimerBox className={styles.Timer} ref={this.timerRef}/>
                            <RestartButton className={styles.Restart} onClick={() => this.restart()}/>
                            <br />
                            <span>Shift-click to place a flag</span>
                        </div>
                        { this.state.won &&
                            <VictoryScreen time={this.timerRef.current.timeString}/>
                        }
                        <Board game={this.state.game}/>
                    </div>
                }
            </div>
        );
    }

    start(width, height, bombPercent) {

        let onFirstReveal = () => this.timerRef.current.start();

        let onLose = () => {
            this.timerRef.current.stop();
        };

        let onWin = () => {
            let newState = Object.assign({}, this.state);
            newState.won = true;
            this.setState(newState);
            this.timerRef.current.stop();
        };

        let game = new MineSweeper(width, height, bombPercent, onFirstReveal, onWin, onLose);
        this.setState({
            game: game,
            bombsRemaining: game.bombsRemaining(),
            started: true,
            won: false,
        });
    }

    restart() {
        this.setState({
            started: false,
            won: false,
            game: null,
            bombsRemaining: -1,
        });
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {game: props.game};
    }

    onClick(e, tile) {
        if (!this.state.game.finished()) {
            let gameCopy = Object.assign({}, this.state.game);
            if (e.shiftKey) {
                gameCopy.toggleFlag(tile);
            } else if (!tile.flagged) {
                gameCopy.reveal(tile);
            }
            this.setState({game: gameCopy});
        }
    }

    render() {

        let key = 0;

        let body = this.state.game.grid.map((row) => {
            return <tr key={key++}>
                {row.map((col) => {
                    let td_class = styles.Tile_container;
                    if (!col.revealed) {
                        td_class += " " + styles.Tile_container_hidden;
                    }
                    return (
                        <td className={td_class} key={key++}>
                            <Tile {...col}
                                  finished={this.state.game.finished()}
                                  onClick={(e) => this.onClick(e, col)}/>
                        </td>
                    );
                })}
            </tr>;
        });

        return (
            <table className={styles.Board}>
                <tbody>{body}</tbody>
            </table>
        );
    }
}

function Tile({revealed, flagged, finished, isBomb, bombCount, onClick}) {
    let child;
    let className = styles.Tile;

    if (!revealed && flagged) {
        child = <img src={FlagImg} alt={"flag"}/>;
    } else if ((finished || revealed) && isBomb) {
        child = <img src={BombImg} alt={"bomb"}/>;
    } else if (revealed && bombCount > 0) {
        child = <span>{bombCount}</span>;
    } else {
        child = <span/>;
    }

    if (revealed) {
        className += " " + styles.Tile_revealed;
        if (!isBomb) {
            className += " " + TEXT_COLOR[bombCount];
        } else {
            className += " " + styles.Tile_explosion;
        }
    } else {
        className += " " + styles.Tile_unrevealed;
    }

    return (
        <button
            onClick={(e) => {
                onClick(e);
            }}
            className={className}>
            {child}
        </button>
    );
}

const TEXT_COLOR = [
    null,
    styles.Tile_bombCount1,
    styles.Tile_bombCount2,
    styles.Tile_bombCount3,
    styles.Tile_bombCount4,
    styles.Tile_bombCount5,
    styles.Tile_bombCount6,
    styles.Tile_bombCount7,
    styles.Tile_bombCount8,
    null,
];

function VictoryScreen({time}) {
    return (
        <div>
            <span>You won!</span>
            <br />
            <span>{time}</span>
        </div>
    );
}

function Setup(props) {
    return (
        <div className={styles.setupContainer}>
            <button className={styles.difficultyButton} onClick={() => props.onClick(10, 10, 0.2)}>Easy</button>
            <button className={styles.difficultyButton} onClick={() => props.onClick(13, 13, 0.25)}>Medium</button>
            <button className={styles.difficultyButton} onClick={() => props.onClick(16, 16, 0.3)}>Hard</button>
        </div>
    )
}