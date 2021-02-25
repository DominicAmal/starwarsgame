import React, { useState } from "react";
/**
 * Dropdown componnent
 * @param { defaultType, selectedType }
 */
export const DropDown = ({ defaultType, selectedType }) => {
    const [type, setType] = useState(defaultType);
    const options = [
        { value: "people", label: "People" },
        { value: "starships", label: "Starships" },
    ];
    const changeType = (newType) => {
        setType(newType);
        selectedType(newType);
    };
    const createOptions = () => {
        return options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        ));
    };
    return (
        <form>
            <select
                onChange={(event) => changeType(event.target.value)}
                value={type}
            >
                {createOptions()}
            </select>
        </form>
    );
};
