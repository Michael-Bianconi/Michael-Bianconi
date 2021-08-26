import React from "react";
import styles from "./Minesweeper.module.css";

export class MinesweeperBoardSetup extends React.Component {

    constructor(props) {
        super(props);
        this.widthRef = React.createRef();
        this.heightRef = React.createRef();
        this.bombPercentRef = React.createRef();
        this.difficultyRef = React.createRef();
        this.state = {difficulty: "Medium"};
    }

    render() {
        return (
            <div>
                <table className={styles.MainTable}>
                    <tbody>
                    <tr>
                        <td>
                            <label htmlFor="width">Width</label>
                        </td>
                        <td>
                            <input id="width"
                                   type="number"
                                   className={styles.WidthHeightInput}
                                   min={1} max={100} step={1}
                                   defaultValue={30}
                                   ref={this.widthRef}/>
                        </td>
                        <td>
                            <label htmlFor="height">Height</label>
                        </td>
                        <td>
                            <input id="height"
                                   type="number"
                                   className={styles.WidthHeightInput}
                                   min={1} max={100} step={1}
                                   defaultValue={16}
                                   ref={this.heightRef}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="numBombs">Difficulty</label>
                        </td>
                        <td colSpan={2}>
                            <input id="numBombs"
                                   type="range"
                                   min={0}
                                   max={0.3}
                                   defaultValue={0.2}
                                   step={0.01}
                                   onChange={() => this.updateDifficulty()}
                                   ref={this.bombPercentRef}/>
                        </td>
                        <td>
                            <span ref={this.difficultyRef}>{this.state.difficulty}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <button onClick={() => this.props.onStart(this.setup)}
                                    className={styles.StartButton}>
                                Start
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    get setup() {
        return {
            "width": parseInt(this.widthRef.current.value),
            "height": parseInt(this.heightRef.current.value),
            "bombPercent": parseFloat(this.bombPercentRef.current.value),
        };
    }

    updateDifficulty() {
        let bombPercent = parseFloat(this.bombPercentRef.current.value);
        let difficulty;
        if (bombPercent < 0.1) {
            difficulty = "Easy";
        } else if (bombPercent < 0.2) {
            difficulty = "Medium";
        } else {
            difficulty = "Hard";
        }
        this.setState({difficulty: difficulty});
    }
}