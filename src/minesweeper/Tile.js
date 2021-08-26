import styles from "./Minesweeper.module.css";
import FlagImg from "./flag.png";
import BombImg from "./bomb.png";
import React from "react";

/**
 * Functional component for displaying a single tile on the board.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function Tile({revealed, flagged, finished, isBomb, bombCount, onClick}) {
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