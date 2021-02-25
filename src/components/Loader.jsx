import React from "react";
import Spinner from "../loader.svg";

class Loader extends React.Component {
    render() {
        return (
            <div>
                <img className="loader" src={Spinner} alt="Loading..." />
            </div>
        );
    }
}

export default Loader;
