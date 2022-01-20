import React from "react";
import FilmItemRow from "./filmItemRow";

class Items extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello from {this.props.name}</h1>
        <p>height: {this.props.height}</p>
        <p>
          <a href={this.props.homeworld}>homeworld</a>
        </p>
        <ul>
          <FilmItemRow
            films={this.props.films}
            filmTitle={this.props.filmTitle}
          />
        </ul>
      </div>
    );
  }
}

export default Items;
