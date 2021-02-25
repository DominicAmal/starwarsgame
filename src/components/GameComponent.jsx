import React, { Component } from "react";
import isEqual from "react-fast-compare";
import _ from "lodash";

const starships = [
    "name",
    "model",
    "manufacturer",
    "max_atmosphering_speed",
    "length",
    "hyperdrive_rating",
    "cargo_capacity",
    "starship_class",
];
const people = [
    "name",
    "birth_year",
    "eye_color",
    "gender",
    "hair_color",
    "mass",
    "skin_color",
    "height",
];
const types = {
    starships,
    people,
};
class GameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: {},
            player2: {},
            type: "people",
            playerOneStatus: false,
            playerTwoStatus: false,
        };
    }

    componentDidMount() {
        this.updatePropsToState();
    }
    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.updatePropsToState();
        }
    }
    /**
     * Set the player from props to state
     */
    updatePropsToState = () => {
        const { player1, player2, type } = this.props;
        let playerOneStatus;
        let playerTwoStatus;
        if (type === "people") {
            /**
             * If the type is people then check whether the player height is greater than or not
             */
            playerOneStatus =
                parseInt(player1.height) > parseInt(player2.height)
                    ? true
                    : false;
            /**
             * If player one is true than player two is false
             */
            playerTwoStatus = !playerOneStatus;
            /**
             * If both player is equal value than both players are true
             */
            const isPeopleEqual =
                parseInt(player1.height) == parseInt(player2.height)
                    ? true
                    : false;
            if (isPeopleEqual) {
                playerOneStatus = true;
                playerTwoStatus = true;
            }
        } else {
            /**
             * If the type is starship then check whether the player hyperdrive_rating is greater than or not
             */
            playerOneStatus =
                parseFloat(player1.hyperdrive_rating) >
                parseFloat(player2.hyperdrive_rating)
                    ? true
                    : false;
            /**
             * If player one is true than player two is false
             */
            playerTwoStatus = !playerOneStatus;
            /**
             * If both player is equal value than both players are true
             */
            const isStarsEqual =
                parseFloat(player1.hyperdrive_rating) ==
                parseFloat(player2.hyperdrive_rating)
                    ? true
                    : false;
            if (isStarsEqual) {
                playerOneStatus = true;
                playerTwoStatus = true;
            }
        }
        this.setState({
            player1,
            player2,
            type,
            playerOneStatus,
            playerTwoStatus,
        });
    };
    /**
     * Get player one  data
     */
    playerOne = () => {
        const { player1, type } = this.state;
        const selectedPlayerOneProperties = _.pick(player1, types[type]);
        const playerDetails = this.getPlayerDetails(
            selectedPlayerOneProperties
        );
        return playerDetails;
    };
    /**
     * Get player Two  data
     */
    playerTwo = () => {
        const { player2, type } = this.state;
        const selectedPlayerOneProperties = _.pick(player2, types[type]);
        const playerDetails = this.getPlayerDetails(
            selectedPlayerOneProperties
        );
        return playerDetails;
    };
    /**
     * To get the player details
     * @param {*} playerDetail
     */
    getPlayerDetails = (playerDetail) => {
        return Object.entries(playerDetail).map((val, i) => (
            <li key={i}>
                <div> {val[0]} </div>{" "}
                <div>
                    {" "}
                    <i> - </i> {val[1]}{" "}
                </div>
            </li>
        ));
    };

    render() {
        const { playerOneStatus, playerTwoStatus } = this.state;
        return (
            <>
                <div className="cards__container">
                    <div
                        className={"card " + (playerOneStatus ? "won" : "lost")}
                    >
                        <ul> {this.playerOne()} </ul>
                        {playerOneStatus ? <h1>Won</h1> : <h1>Lost</h1>}
                    </div>
                    <div
                        className={"card " + (playerTwoStatus ? "won" : "lost")}
                    >
                        <ul> {this.playerTwo()} </ul>
                        {playerTwoStatus ? <h1>Won</h1> : <h1>Lost</h1>}
                    </div>
                </div>
            </>
        );
    }
}

export default GameComponent;
