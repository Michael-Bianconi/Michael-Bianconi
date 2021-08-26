import React, {createRef} from "react";
import MineSweeper from "./minesweeper";
import styles from "./Minesweeper.module.css";
import TimerBox from "../general/TimerBox";
import RestartButton from "../general/RestartButton";
import Board from "./Board";
import {MinesweeperBoardSetup} from "./Setup";

export default class PlayMinesweeper extends React.Component {

    constructor(props) {
        super(props);
        this.timerRef = createRef();
        this.state = {started: false, won: false, game: null};
    }

    render() {
        return (
            <div className={styles.Root}>
                <h1>Minesweeper</h1>
                {!this.state.started
                    ?
                    <div className={styles.SetupContainer}>
                        <MinesweeperBoardSetup onStart={(setup) => this.start(setup)}/>
                    </div>
                    :
                    <div>
                        <div className={styles.AdminBar}>
                            <span className={styles.BombsRemaining}>{this.state.game.bombsRemaining()}</span>
                            <TimerBox className={styles.Timer} ref={this.timerRef}/>
                            <RestartButton className={styles.Restart} onClick={() => this.restart()}/>
                        </div>
                        { this.state.won &&
                            <VictoryScreen time={this.timerRef.current.timeString}/>
                        }
                        <Board game={this.state.game}/>
                        <span>Shift-click to place a flag</span>
                    </div>
                }
            </div>
        );
    }

    start(setup) {

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


        this.setState({
            game: new MineSweeper(setup.width, setup.height, setup.bombPercent, onFirstReveal, onWin, onLose),
            started: true,
            won: false,
        });
    }

    restart() {
        this.setState({
            started: false,
            won: false,
            game: null,
        });
    }
}

function VictoryScreen({time}) {
    return (
        <div>
            <span>You won!</span>
            <br />
            <span>{time}</span>
        </div>
    );
}