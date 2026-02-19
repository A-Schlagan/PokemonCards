//dropdown.js
import React, { Component } from "react"

export default class PokemonSelector extends Component {
    handleChange = (event) => {
        console.log("Etwas aus Dropdown Menü gewählt!")
        const value = event.target.value
        this.props.onChange(value)
    }

    render() {
        return (
            <select className="type-select" onChange={this.handleChange}>
                {this.props.children}
            </select>
        );
    }
}

/*
-- zu statisch - nicht flexibel genug! -
<select>
    <option>blablabla</option>
    <option>blablabla</option>
    <option>blablabla</option>
</select
*/