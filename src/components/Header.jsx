import React, { Component } from "react";
import { DropDown } from "./DropDown";

class Header extends Component {
    constructor(props) {
        super(props);
    }
    selectedType = (data) => {
        this.props.selectType(data);
    };
    play = () => {
        this.props.playAgain();
    };
    render() {
        return (
            <>
                <nav>
                    <div className="nav__container">
                        <h1>Star Wars</h1>
                        <ul>
                            <li className="select__dropdown">
                                <DropDown
                                    selectedType={this.selectedType}
                                    defaultType="people"
                                />
                            </li>
                            <li>
                                {" "}
                                <button
                                    className="play__btn"
                                    onClick={this.play}
                                >
                                    Play Again
                                </button>{" "}
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}

export default Header;
