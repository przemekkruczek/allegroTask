import React from "react";
import { SearchBar } from "./SearchBar";
import { Header } from "./Header";
import { AlbumList } from "./AlbumList";
import spotifyapi from "../apis/spotifyapi";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      albums: []
    };
  }

  onTermSubmit = async term => {
    const token = this.getHashParams();
    const response = await spotifyapi.get(`/search?q=${term}`, {
      headers: { Authorization: "Bearer " + token.access_token }
    });

    this.setState({ albums: response.data.albums.items });
    if (response.data.albums.items.length === 0) {
      this.setState({ albums: "brak" });
    }
  };

  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  render() {
    const params = this.getHashParams();
    if (this.isEmpty(params)) {
      return (
        <div className="login">
          <p className="login__link">
            You have to login to Spotify to use the application:
          </p>
          <button>
            <a className="login__link" href="http://localhost:8888">
              Login to Spotify
            </a>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <div className="container">
            <SearchBar onFormSubmit={this.onTermSubmit} />
            {this.state.albums === "brak" ? (
              <div className="reply">
                Hey, album with such a name does not exist!!! Enter the correct
                name :)
              </div>
            ) : (
              <AlbumList
                albums={this.state.albums}
                getHashParams={this.getHashParams}
              />
            )}
          </div>
        </div>
      );
    }
  }
}

export default App;
