import styles from "./Minesweeper.module.css";
import {Tile} from "./Tile";
import React from "react";

export default class Board extends React.Component {

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
