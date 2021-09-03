import React from "react";
import styles from "./Header.module.css";
import {Link} from "react-router-dom";

export default class Header extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                <ul>
                    <li><Link to={"/"} className={[styles.link, styles.heavy].join(' ')}>michaelbianconi.com</Link></li>
                </ul>
            </div>
        );
    }
}
