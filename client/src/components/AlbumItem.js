import React from "react";
import "./AlbumItem.css";
import spotifyalbum from "../apis/apotifyalbum";
import { AlbumDetails } from "./AlbumDetails";

export class AlbumItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      albumDetail: [],
      showDetails: false
    };
  }
  handleDetails = async () => {
    const token = this.props.getHashParams();
    const response = await spotifyalbum.get(`/albums/${this.props.album.id}`, {
      headers: { Authorization: "Bearer " + token.access_token }
    });
    this.setState({ tracks: response.data.tracks.items });
    this.setState({ albumDetail: response.data });
    if (this.state.showDetails === false) {
      this.setState({ showDetails: true });
    } else {
      this.setState({ showDetails: false });
    }
  };

  render() {
    return (
      <div className="album-item" onClick={this.handleDetails}>
        <img
          className="album-item__image"
          alt={this.props.album.id}
          src={
            this.props.album.images[1].url === null
              ? "http://via.placeholder.com/120x120"
              : this.props.album.images[1].url
          }
        />
        <div className="album-item__description">
          <p className="album-item__description-name">
            {this.props.album.name}
          </p>
          <p className="album-item__description-artist">
            Author: {this.props.album.artists.map(element => element.name)}
          </p>
          <p className="album-item__description-date_release">
            Release date: {this.props.album.release_date}
          </p>
          <p className="album-item__description-tracks_number">
            Number of tracks: {this.props.album.total_tracks}
          </p>
          {this.state.showDetails ? (
            <div className="album-item__details">
              <AlbumDetails
                detailTracks={this.state.tracks}
                albumDetail={this.state.albumDetail}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
