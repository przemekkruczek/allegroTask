import React from "react";
import "./Header.css";

export class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header__logo">
          <h1 className="header__logo-title">Spotify Albums Library</h1>
        </div>
      </header>
    );
  }
}
