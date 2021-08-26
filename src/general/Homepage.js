import React from "react";
import Header from "./Header";
import TextNextToImage from "./TextNextToImage";

export default class Homepage extends React.Component {

    render() {
        return (
            <div>
                <Header />
                Welcome
                <TextNextToImage img={'/Stock_WomanKissingFish.png'} text={"Huh?"} />
            </div>
        );
    }
}