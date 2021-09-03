import React from "react";
import styles from "./BubbleGrid.module.css";

/**
 * Displays a grid of elements, with large speech-bubble style
 * bubbles around each element and lots of space between.
 *
 * Props: cols=number
 *
 * Usage:
 * <BubbleGrid cols=N>
 *     <div>...</div>
 *     <div>...</div>
 *     <div>...</div>
 *     ...
 * </BubbleGrid>
 */
export class BubbleGrid extends React.Component {

    render() {
        let rows = [];
        let cols = this.props.cols;
        for (let i = 0; i < this.props.children.length; i += cols) {
            let row = this.props.children.slice(i, i + cols);
            for (let j = 0; j < row.length; j++) {
                row[j] = <td key={j}>{row[j]}</td>;
            }
            rows.push(<tr key={i}>{row}</tr>);
        }
        return (
            <table className={styles.BubbleGrid}><tbody>{rows}</tbody></table>
        );
    }
}