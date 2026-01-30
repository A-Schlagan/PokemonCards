//System
import React, { Component } from "react";

//Components
import PokemonCard from "../components/pokemonCard";

//Styling
import "../styling/global.css";

class Index extends Component {
  //pokemons = [
    // { name: "Pikachu", type: "Elektro" },
    // { name: "Glumanda", type: "Feuer" },
    // { name: "Bisasam", type: "Pflanze" }
  //]


  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      likes: {},
      pokemons: []
    };
    console.log("Constructor() aufgerufen!")
  }

  //fetchDetails = async (url) => {
  //  const response = await fetch(url);
  //  const data = await response.json();
  //  return data
  //}

  fetchPokemons = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    console.log(data);

    const eintraege = await Promise.all(
      data.results.map(async (eintrag) => {

        const detailsResp = await fetch(eintrag.url);
        const detailsData = await detailsResp.json();

        return{
          name: detailsData.name,
          type: detailsData.types[0].type.name, // erster Typ
          image: detailsData.sprites.front_default // Bild-URL
        };
      })
    )
      this.setState({ pokemons: eintraege })

    //eintraege.forEach(eintrag => {
      //const details = this.fetchDetails(eintrag.url)
      //this.pokemons.push({ name: eintrag.name, type: eintrag.url })
      //console.log(this.details)
    //});
    //console.log(this.pokemons)
    //this.forceUpdate()
  }

  componentDidMount() {
    console.log("componentDidMount() - Jetz werden Daten über Api gezogen!");
    this.fetchPokemons();
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  toggleLike = (name) => {
    this.setState(prevState => ({
      likes: {
        ...prevState.likes,
        [name]: !prevState.likes[name]
      }
    }))
  }


  render() {
    console.log("render aufgerufen")
    const filteredPokemons = this.state.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
      pokemon.type.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );



    return (
      <div>
        <h1>Pokedex</h1>

        <input
          className="search"
          type="text"
          placeholder="Suche nach Name oder Typ..."
          value={this.state.searchTerm}
          onChange={this.handleSearchChange}
        />

        <div className="pokemon-list">

          {filteredPokemons.map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                type={pokemon.type}
                image={pokemon.image}
                liked={this.state.likes[pokemon.name]}
                toggleLike={() => this.toggleLike(pokemon.name)}
              />
            );
          })}
        </div></div >
    );
  }
}


export default Index;