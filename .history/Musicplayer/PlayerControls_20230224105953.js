import Image from "next/image";
import { useState } from "react";
import React from "react";
import Sound from "react-sound";
import { PlayPauseTrack } from "./audio_controls/PlayPauseTrack";
import { Repeat } from "./audio_controls/Repeat";
import { NextTrack } from "./audio_controls/NextTrack";
import { PreviousTrack } from "./audio_controls/PreviousTrack";
import { Volume } from "./audio_controls/Volume";
import { ShuffleTrack } from "./audio_controls/ShuffleTrack";
import LinearProgress from '@mui/material/LinearProgress';

function control(key, text, clickHandler) {
  const onClick = (ev) => {
    ev.preventDefault();
    if(text == "Play")
  };
  return (
    <div>
      <a href="#" onClick={onClick}>
        <PlayPauseTrack playPauseTrack={clickHandler} isPlaying={key} />
      </a>
    </div>
  );
}

const numberFormat = new Intl.NumberFormat([], { minimumFractionDigits: 2 });



export default class PlayerControls extends React.Component {
  state = {shuffle: false};

  render() {
   
    return <div>{this.renderControls()}</div>;
  }

  renderControls() {
    const { shuffle } = this.state;
    const setShuffle = shuffle => this.setState({ shuffle });
    const shuffleTrack = () => { setShuffle(!shuffle) };

    const handleAudioEnded = () => {
          if (shuffle) {
            const newIndex = Math.floor(Math.random() * songs.length + 1);
            this.setState({
              currentSong : songs[newIndex],
            })
          } else {
            this.props.onNext;
          }
        };

    const controls = {
      play: this.props.playStatus === Sound.status.STOPPED,
      stop: this.props.playStatus !== Sound.status.STOPPED,
      pause: this.props.playStatus === Sound.status.PLAYING,
      resume: this.props.playStatus === Sound.status.PAUSED,
    };

    return (
      <div className="text-slate-200 hover:text-slate-50">
        <div className="flex justify-between items-center px-6 bg-zinc-600/80 rounded-lg ">
          <Repeat
            loopTrack={this.props.onToggleLoop}
            isLooping={this.props.loop}
          />

          <PreviousTrack previousTrack={this.props.onPrev} />

          <div className="pt-2">
            {controls.play && control(false, "Play", this.props.onPlay)}
            {controls.pause && control(true, "Pause", this.props.onPause)}
            {controls.resume && control(false, "Resume", this.props.onResume)}
          </div>

          <NextTrack nextTrack={this.props.onNext} />

          <ShuffleTrack shuffleTrack={shuffleTrack} isShuffling={shuffle} />

        </div>

        <div className="flex justify-center py-4">
          <Volume
            changeVolume={this.props.onVolumeChange}
            volume={this.props.volume}
          />
          <LinearProgress variant="determinate" value={progress} />
        </div>

        {/* <div>
          Playback Rate:
          <button onClick={this.props.onPlaybackRateDown}>-</button>{" "}
          {numberFormat.format(this.props.playbackRate)}{" "}
          <button onClick={this.props.onPlaybackRateUp}>+</button>
        </div> */}
      </div>
    );
  }
}
