import React, { Component } from "react";
import PokemonCard from "../components/pokemonCard";
import "../styling/global.css";
import PokemonSelector from "../components/dropdown";

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      selectedType: "Alle",
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
          type: detailsData.types[0].type.name, 
          image: detailsData.sprites.front_default 
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

  handleTypeChange = (type) => {
    this.setState({ selectedType: type });
  };

  toggleLike = (name) => {
    this.setState(prevState => ({
      likes: {
        ...prevState.likes,
        [name]: !prevState.likes[name]
      }
    }))
  }


  render() {
    const uniqueTypes = ["Alle", ...new Set(this.state.pokemons.map(p => p.type))];
    const filteredPokemons = this.state.pokemons.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
      const matchesType = this.state.selectedType === "Alle" || pokemon.type === this.state.selectedType;

      return matchesName && matchesType;
    });

    return (
      <div>
        <h1>Pokedex</h1>

        <div className="search-container">
          <input
            className="search"
            type="text"
            placeholder="Suche nach Name..."
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
          />

          <PokemonSelector onChange={this.handleTypeChange}>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </PokemonSelector>
        </div>

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