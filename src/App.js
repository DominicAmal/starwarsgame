import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import GameComponent from "./components/GameComponent";
import Loader from "./components/Loader";
const fetchURL = "http://swapi.dev/api";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starWars: [],
            type: "people",
            player1: {},
            player2: {},
            loader: false,
            peopleCount: 0,
            starshipCount: 0,
            page: 1,
        };
    }
    /**
     * Invokes after component mounted
     */
    componentDidMount() {
        this.fetchData();
    }
    /**
     * Once the dropdown selected the selected type will be passed
     * @param {*} selectedType
     */
    selectType = (selectedType) => {
        this.setState({ type: selectedType }, () => {
            this.fetchData();
        });
    };
    /**
     *The result array will be shuffled
     * @param {*} array
     */
    shuffleStarWars = (array) => {
        const length = Array.isArray(array) && array.length - 1;
        for (let i = length; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    /**
     * To get the starwars or people results
     */
    fetchData = () => {
        this.setState({ loader: true });
        const { type } = this.state;
        /**
         * Get page number
         */
        const page = this.getPageNumber(type);

        /**
         * API invocation based on the type with page number
         */
        fetch(`${fetchURL}/${type}?page=${page}`)
            .then((res) => res.json())
            .then(({ results, count }) => {
                let starWarsResult = this.shuffleStarWars(results);
                const halfLength = Math.ceil(starWarsResult.length / 2);
                const playerOnefirstHalf = starWarsResult.slice(0, halfLength);
                const playerTwoSecondHalf = starWarsResult.slice(halfLength);
                const player1 =
                    playerOnefirstHalf[
                        Math.floor(Math.random() * playerOnefirstHalf.length)
                    ];
                const player2 =
                    playerTwoSecondHalf[
                        Math.floor(Math.random() * playerTwoSecondHalf.length)
                    ];
                this.setState({
                    player1,
                    player2,
                    loader: false,
                    ...(type == "people" && { peopleCount: count }),
                    ...(type == "starships" && { starshipCount: count }),
                });
            })
            .catch((err) => console.error(err));
    };
    /**
     * To get the page number
     * @param {*} type
     */
    getPageNumber = (type) => {
        const { peopleCount, starshipCount } = this.state;

        const count = type === "people" ? peopleCount : starshipCount;
        /**
         * Get the total page from the count
         */
        const totalPage = count ? Math.ceil(count / 10) : 1;
        /**
         * Get the random page from the
         */
        const page = Math.floor(Math.random() * (totalPage - 1 + 1)) + 1;

        return page;
    };
    /**
     * To play again the game
     */
    playAgain = () => {
        this.fetchData();
    };

    render() {
        const { player1, player2, type, loader } = this.state;
        return (
            <>
                <Header
                    selectType={this.selectType}
                    playAgain={this.playAgain}
                />

                {loader ? (
                    <Loader />
                ) : (
                    <GameComponent
                        player1={player1}
                        player2={player2}
                        type={type}
                    />
                )}
            </>
        );
    }
}

export default App;
