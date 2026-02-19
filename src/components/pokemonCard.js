import React, { Component } from "react";
import "../styling/global.css";

class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = { favorite: false };
  }

  toggleFavorite = () => {
    const newFavorite = !this.state.favorite;
    this.setState({ favorite: newFavorite });
  };

  render() {
    const { name, type, image, height, weight, xp } = this.props;
    const { favorite } = this.state;

    return (
      <div className="pokemon-card">
        <div className="image-frame">
          <img alt={name} src={image} />
          <button className="like-btn" onClick={this.toggleFavorite}>
             {favorite ? "❤️" : "🤍"}
          </button>
        </div>
        
        <h2>{name}</h2>
        <p>Typ: {type}</p>
        <p>Größe: {height}</p>
        <p>Gewicht: {weight}</p>
        <p>XP: {xp}</p>
      </div>
    );
  }
}

export default PokemonCard;