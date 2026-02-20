import React, { Component } from "react";
import PokemonCard from "../components/pokemonCard";
import PokemonSelector from "../components/dropdown";
import "../styling/global.css";
import {Link} from "gatsby";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      selectedType: "",
      pokemons: [],
      nextURL: "https://pokeapi.co/api/v2/pokemon?limit=20",
      isLoading: false,
      hasMore: true,
    };
    console.log("constructor() aufgerufen!");
  }

  fetchDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  fetchPokemons = async () => {
    const nextURL = this.state.nextURL;

    if (!nextURL) {
      console.log("Keine weiteren Pokemon mehr zu laden!");
      this.setState({ hasMore: false });
      return;
    }

    this.setState({ isLoading: true });

    const response = await fetch(nextURL);
    const data = await response.json();

    const eintraege = data.results;
    const next = data.next;
    const neuepokemons = [];

    const pokemons = this.state.pokemons;
    
    const detailInfos = eintraege.map(async (eintrag) => {
      const detailResponse = await this.fetchDetails(eintrag.url);

      const typesResponse = detailResponse.types;
      let type = "";
      typesResponse.forEach((eintrag) => {
        type += eintrag.type.name + " ";
      });

      const imgURL = detailResponse.sprites.front_default;
      const height = detailResponse.height;
      const weight = detailResponse.weight;
      const baseXP = detailResponse.base_experience;

      neuepokemons.push({
        name: eintrag.name,
        type: type.trim(), 
        image: imgURL, 
        height: height,
        weight: weight,
        xp: baseXP,
      });
    });

    await Promise.all(detailInfos);

    this.setState({
      pokemons: [...pokemons, ...neuepokemons],
      nextURL: next,
      isLoading: false,
      hasMore: true,
    });
  };

  componentDidMount() {
    console.log("componentDidMount() aufgerufen: Daten laden und Scroll-Event registrieren!");
    this.fetchPokemons(); 
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { isLoading, hasMore } = this.state;
    if (isLoading || !hasMore) {
      return;
    }
    
    const scrollTop = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (windowHeight + scrollTop >= fullHeight - 200) {
      console.log("Fast am ende der Seite -> neue Pokemons laden!");
      this.fetchPokemons();
    }
  };

  onSearchHandle = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  onSelectHandle = (value) => {
    this.setState({ selectedType: value });
  };

  render() {
    console.log("render() aufgerufen - Komponenten werden in Browser dargestellt!");
    
    const searchTerm = this.state.searchTerm;
    const term = searchTerm.trim().toLowerCase();

    const selectedType = this.state.selectedType;
    const type = selectedType.trim().toLowerCase();

    const pokemons = this.state.pokemons;
    const isLoading = this.state.isLoading;

    const gefiltertePokemons = pokemons.filter((pokemon) => {
      return (
        (pokemon.name.toLowerCase().includes(term) ||
          pokemon.type.toLowerCase().includes(term)) &&
        pokemon.type.toLowerCase().includes(type)
      );
    });

    return (
      <div>
        <h1>Pokedex</h1>
        <div style={{ marginBottom: "20px" }}>
        <Link to="/items">
        <button className="nav-link">Zur Items-Übersicht</button>
        </Link>
        </div>
        <div className="search-container">
          <input
            className="search"
            type="text"
            value={searchTerm}
            onChange={this.onSearchHandle}
            placeholder="Pokemon suchen..."
          />
          
          <PokemonSelector onChange={this.onSelectHandle}>
            <option value="">Alle Typen</option>
            <option value="fire">Feuer</option>
            <option value="water">Wasser</option>
            <option value="grass">Pflanze</option>
            <option value="electric">Elektro</option>
          </PokemonSelector>
        </div>

        <div className="pokemon-list">
          {gefiltertePokemons.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              type={pokemon.type}
              image={pokemon.image}
              height={pokemon.height}
              weight={pokemon.weight}
              xp={pokemon.xp}
            />
            </Link>
          ))}
        </div>

        {isLoading ? <p style={{textAlign: "center"}}>Neue Pokemons werden geladen ...</p> : <></>}
      </div>
    );
  }
}

export default Index;