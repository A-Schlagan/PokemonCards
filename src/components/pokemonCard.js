import React, {Component} from "react";

export default class PokemonCard extends Component{
    render(){
        const {name, type} = this.props
        return(
            <div>
                <img alt={name}/>
                <h2>{name}</h2>
                <p>Typ: {type}</p>
            </div>
        )
    }
}