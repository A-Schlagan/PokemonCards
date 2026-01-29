//System
import React, { Component } from "react";

//Components
import PokemonCard from "../components/pokemonCard";

//Styling
import "../styling/global.css"

class Index extends Component {
  pokemons = [
    { name: "Pikachu", type: "Elektro" },
    { name: "Glumanda", type: "Feuer" },
    { name: "Bisasam", type: "Pflanze" }
  ]


  constructor(props) {
    super(props);
  }

  componentWillMount() {


  }

  componentDidMount() {

  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }


  render() {
    return (
      <div>
        <h1>Pokedex</h1>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {this.pokemons.map((pokemon) => {
            return <PokemonCard name={pokemon.name} type={pokemon.type} />
          })}
        </div></div>
    );
  }
}


export default Index;