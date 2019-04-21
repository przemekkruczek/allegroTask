import React from "react";
import "./AlbumDetails.css";

export class AlbumDetails extends React.Component {
  //function convert milliseconds to min:seconds
  millisToMinutesAndSeconds = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  render() {
    if (this.props.detailTracks.length !== 0) {
      //function convert milliseconds to hour:min:seconds
      const durationArray = this.props.detailTracks.map(
        element => element.duration_ms
      );
      const duration = Math.round(
        durationArray.reduce((total, element) => total + element) / 1000
      );
      const measuredTime = new Date(null);
      measuredTime.setSeconds(duration);
      const MHSTime = measuredTime.toISOString().substr(11, 8);
      const renderedTracks = this.props.detailTracks.map(track => {
        const trackDuration = this.millisToMinutesAndSeconds(track.duration_ms);
        return (
          <div key={track.id}>
            <p>
              <span className="album-item__tracks-list-name">{track.name}</span>
              {"  "}
              duration: {trackDuration}
            </p>
            <p>
              <iframe
                src={`https://open.spotify.com/embed/track/${track.id}`}
                title={track.id}
                width="300"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
              />
            </p>
          </div>
        );
      });

      return (
        <div>
          <p className="album-item__details-duration_album">
            Duration of the album: {MHSTime}
          </p>
          <p className="album-item__details-popularity">
            Popularity: {this.props.albumDetail.popularity}
          </p>
          <div className="album-item__tracks-list">
            <span className="album-item__tracks-list-header">Tracks list:</span>
            {renderedTracks}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
