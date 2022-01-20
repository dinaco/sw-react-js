import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Items from "./components/items";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      height: null,
      homeworld: null,
      films: [],
      filmTitle: [],
      loading: false,
      error: false,
      clicks: 0,
      remaining: 5,
      disabled: false,
    };
  }
  getChar() {
    this.setState({ filmTitle: [] });
    this.setState({ loading: true });
    const randomNumber = Math.ceil(Math.random() * 10);
    const url = `https://swapi.dev/api/people/${randomNumber}`;
    axios({
      method: "GET",
      url,
      timeout: 4000,
    })
      .then((response) => {
        const { data } = response;
        this.setState({
          name: data.name,
          height: data.height,
          homeworld: data.homeworld,
          films: data.films,
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState({ error: true });
      })
      .then(() => {
        axios
          .all(
            this.state.films.map((endpoint) => {
              return axios({
                method: "GET",
                url: endpoint,
                timeout: 4000,
              });
            })
          )
          .then((response) => {
            response.map((values) => {
              const { data } = values;
              return this.setState({
                filmTitle: [...this.state.filmTitle, data.title],
              });
            });
            this.setState({
              loading: false,
              clicks: this.state.clicks + 1,
              remaining: this.state.remaining - 1,
              disabled: this.state.remaining <= 1 ? true : false,
            });
          })
          .catch((error) => {
            console.warn(error);
            this.setState({ error: true, loading: false });
          });
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.loading && this.state.name && (
            <Items
              name={this.state.name}
              height={this.state.height}
              homeworld={this.state.homeworld}
              films={this.state.films}
              filmTitle={this.state.filmTitle}
            />
          )}
          <button disabled={this.state.disabled} onClick={() => this.getChar()}>
            Get New Character
          </button>
          <p>
            You already clicked {this.state.clicks} and still have{" "}
            {this.state.remaining} credits left.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
