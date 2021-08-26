import React from "react";

/**
 * Props:
 *      img: Path to image
 *      text: Text string
 *      bold: boolean
 *      text_right: If true, puts image on the left and text on the right.
 */
export default class TextNextToImage extends React.Component {

    render() {
        let img_column = <div><img src={this.props.img} alt={"alt"} /></div>;
        let txt_column = <div><p>{this.props.text}</p></div>;

        return (
            <div>
                { this.props.text_right
                    ? img_column && txt_column
                    : txt_column && img_column
                }
            </div>
        );
    }
}