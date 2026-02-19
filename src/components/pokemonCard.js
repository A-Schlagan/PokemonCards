// pokemonCard.js
import React, { Component } from "react";
import "../styling/global.css";

export default class PokemonCard extends Component {
  render() {
    const { name, type, liked, toggleLike, image } = this.props;

    return (
      <div className="pokemon-card">
        <div className="image-frame">
          <img src={image} alt={name} />
          <button className="like-btn" onClick={toggleLike}>
            {liked ? "❤️" : "🤍"}
          </button>
        </div>
        <h2>{name}</h2>
        <p>Typ: {type}</p>
      </div>
    );
  }
}

