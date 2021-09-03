import React from "react";
import styles from "./About.module.css";

export class About extends React.Component {

    render() {
        return (
            <div>
                <span className={styles.big}>About</span>
                <p>
                    Michael Bianconi is a software developer living in Rochester, New York.
                </p>
            </div>
        );
    }
}