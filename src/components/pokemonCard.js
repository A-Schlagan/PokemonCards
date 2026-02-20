import React, { Component } from "react";
import "../styling/global.css";

class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = { favorite: false };
  }

  toggleFavorite = (event) => {
    event.preventDefault();
    const newFavorite = !this.state.favorite;
    this.setState({ favorite: newFavorite });
  };

  render() {
    const { name, type, image, height, weight, xp } = this.props;
    const { favorite } = this.state;

    return (
      <div className="pokemon-card">
        <button className="like-btn" onClick={this.toggleFavorite}>
          {favorite ? "❤️" : "🤍"}
        </button>
        <div className="image-frame">
          <img alt={name} src={image} />
        </div>

        <h2 className="pokemon-name">{name}</h2>
        <span className="pokemon-type">{type}</span>

        <div className="pokemon-stats">
          <div className="stat">
            <span className="stat-value">{height}</span>
            <span className="stat-label">Größe</span>
          </div>
          <div className="stat">
            <span className="stat-value">{weight}</span>
            <span className="stat-label">Gewicht</span>
          </div>
          <div className="stat">
            <span className="stat-value">{xp}</span>
            <span className="stat-label">XP</span>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonCard;