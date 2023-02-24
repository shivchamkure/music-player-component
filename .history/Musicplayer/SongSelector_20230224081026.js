import React from 'react';

export default class SongSelector extends React.Component {
  render() {
    return (

         <select className='text-zinc-500/60  bg-zinc-500 h-12 rounded-b-xl' name='select song' value={this.props.songs.indexOf(this.props.selectedSong)} onChange={this.handleSongChange.bind(this)}>
          <option/>
          {this.renderSongOptions()}
        </select>

    );
  }

  renderSongOptions() {
    return this.props.songs.map((song, index) => {
      return (
        <option key={index} value={index}>
          {song.title}
        </option>
      );
    });
  }

  handleSongChange(ev) {
    this.props.onSongSelected(this.props.songs[ev.target.value]);
  }
}
