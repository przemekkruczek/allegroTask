import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = { term: "" };
  }
  onInputChange = event => {
    this.setState({
      term: event.target.value
    });
  };
  onFormSubmit = () => {
    this.props.onFormSubmit(this.state.term);
  };
  render() {
    return (
      <div className="search-bar">
        <form className="search-bar__form" onSubmit={this.onFormSubmit}>
          <div className="search-bar__label">
            <label>Album Search</label>
          </div>
          <div className="search-bar__field">
            <div className="search-bar__field-avatar">
              <i className="fas fa-search" />
            </div>
            <div className="search-bar__field-line" />
            <input
              type="text"
              placeholder="Find albums..."
              className="search-bar__field-input"
              value={this.state.term}
              onChange={this.onInputChange}
            />
          </div>
        </form>
      </div>
    );
  }
}
