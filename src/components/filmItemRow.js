import React from "react";

class FilmItemRow extends React.Component {
  render() {
    const movies = this.props.films.map((url, i) => {
      return (
        <li key={i}>
          <a href={url}>{this.props.filmTitle[i]}</a>
        </li>
      );
    });

    return movies;
  }
}

export default FilmItemRow;
