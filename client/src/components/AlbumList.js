import React from "react";
import { AlbumItem } from "./AlbumItem";
import "./AlbumList.css";

export class AlbumList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "default" };
  }
  handleSort = event => {
    this.setState({ value: event.target.value });
    if (this.state.value !== "alphabetically") {
      this.props.albums.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.props.albums.sort((a, b) =>
        a.release_date.localeCompare(b.release_date)
      );
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.albums !== this.props.albums) {
      this.setState({ value: "default" });
    }
  }
  render() {
    const renderedList = this.props.albums.map(album => {
      return (
        <AlbumItem
          album={album}
          key={album.id}
          getHashParams={this.props.getHashParams}
        />
      );
    });
    return (
      <div>
        {this.props.albums.length === 0 ? null : (
          <div>
            <select
              className="album-sort"
              value={this.state.value}
              onChange={this.handleSort}
            >
              <option value="default" disabled={true}>
                default
              </option>
              <option value="alphabetically">alphabetically</option>
              <option value="release date">release date</option>
            </select>
          </div>
        )}
        {renderedList}
      </div>
    );
  }
}
