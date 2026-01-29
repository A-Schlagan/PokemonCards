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
    this.state = {
      searchTerm: ""
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
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
      const filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        pokemon.type.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );

      return (
        <div>
          <h1>Pokedex</h1>

          <input
            type="text"
            placeholder="Suche nach Name oder Typ..."
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            style={{ padding: "10px", width: "250px", marginBottom: "50px" }}
          />

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {filteredPokemons.map((pokemon) => {
              return <PokemonCard name={pokemon.name} type={pokemon.type} />
            })}
          </div></div>
      );
    }
  }


export default Index;