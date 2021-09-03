import React from "react";
import {Link} from "react-router-dom";
import styles from "./Homepage.module.css";
import SnakeIcon from "./snake.png";
import MinesweeperIcon from "./bomb.png";
import FaceImg from "./face.jpg";

export default class Homepage extends React.Component {

    render() {
        return (
            <div>
                <Section><AboutMe /></Section>
                <Section>
                    <div className={styles.projectBlurbRow}>
                        <ProjectBlurb img={SnakeIcon} caption={"Snake"} to={"/snake"} />
                        <ProjectBlurb img={MinesweeperIcon} caption={"Minesweeper"} to={"/minesweeper"} />
                    </div>
                </Section>
            </div>
        );
    }
}

function Section(props) {
    return <div className={styles.section}>{props.children}</div>
}

function ProjectBlurb(props) {
    return (
        <div className={styles.projectBlurbContainer}>
            <div className={styles.linkImgContainer}>
                <Link to={props.to} className={styles.link}>
                    <img src={props.img} alt={props.caption} />
                </Link>
            </div>
            <Link to={props.to} className={styles.text}>{props.caption}</Link>
        </div>
    )
}

function AboutMe() {
    return (
        <div className={styles.aboutMeContainer}>
            <img src={FaceImg} alt={"My face"} className={styles.aboutMeImg} />
            <div className={styles.aboutMeText}>
                <span>
                        Michael Bianconi is a software developer living in Rochester, New York. He graduated in 2021
                        with a Bachelor's in Computer Science from the Rochester Institute of Technology in New York.
                </span>
                <br />
                <span>Email: michael.a.bianconi@gmail.com</span>
            </div>
        </div>
    );
}