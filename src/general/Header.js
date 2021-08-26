import React from "react";
import {Link} from "react-router-dom";

export default class Header extends React.Component {

    render() {
        return (
            <div>
                <nav>
                    <Link to={"/"}>Me</Link>
                    <Link to={"/404"}>Projects</Link>
                    <Link to={"/404"}>Contact</Link>
                </nav>
            </div>
        );
    }
}
