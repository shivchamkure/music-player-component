import React from 'react';
import Sound from 'react-sound';
import PlayerControls from './PlayerControls';
import SongSelector from './SongSelector';
import songs from './songs';
import Record from '../Spotify/Record';

export default class Rawplayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controlled: true,
      currentSong: songs[0],
      position: 0,
      volume: 50,
      playbackRate: 1,
      loop: false,
      playStatus: Sound.status.STOPPED
    };
  }

  getStatusText() {
    switch (this.state.playStatus) {
      case Sound.status.PLAYING:
        return 'playing';
      case Sound.status.PAUSED:
        return 'paused';
      case Sound.status.STOPPED:
        return 'stopped';
      default:
        return '(unknown)';
    }
  }

  handleSongSelected = (song) => {
    this.setState({ 
      currentSong: song, 
      position: 0 
    });
  }

  handleControlledComponentChange = (ev) => {
    this.setState({
      controlled: ev.target.checked,
      position: 0
    });
  }

  renderCurrentSong() {
    return (
      <div className='flex justify-center py-4'>
        {this.state.currentSong.title}
      </div>
    );
  }

  handleNextSong = () => {

    let tempCurrentIndex = songs.indexOf(this.state.currentSong);
    tempCurrentIndex++;
    if (tempCurrentIndex > songs.length - 1) tempCurrentIndex = 0;
    this.setState({
      currentSong : songs[tempCurrentIndex],
    })
  }
    
  handlePrevSong = () => {

    let tempCurrentIndex = songs.indexOf(this.state.currentSong);
    tempCurrentIndex--;
    if (tempCurrentIndex < 0) tempCurrentIndex = songs.length - 1;
    this.setState({
      currentSong : songs[tempCurrentIndex],
    })
  }

// change volume
  changeVolume = (e) => {
    this.setState({
    volume: e.target.value
    })
  }

  render() {
    const { volume, playbackRate, loop } = this.state;

    return (
      <div className='items-center font-semibold rounded-xl bg-zinc-800 border-orange-200 '>
        <div className="flex justify-center items-center rounded-xl bg-zinc-600 px-2 py-2">
        <Record  isPlaying={this.state.playStatus === Sound.status.PLAYING} imageUrl={'https://qnrmqfeqgglpkvcmqbet.supabase.co/storage/v1/object/sign/portfolio-assets/albumcovers/lofi_record_cover_temp.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwb3J0Zm9saW8tYXNzZXRzL2FsYnVtY292ZXJzL2xvZmlfcmVjb3JkX2NvdmVyX3RlbXAucG5nIiwiaWF0IjoxNjc3MTk0NDU3LCJleHAiOjE3MDg3MzA0NTd9.SO8G6O79I7_TkqvjvU8fIhnFkE0T1c_5EUX5C1Tw27Q&t=2023-02-23T23%3A20%3A57.150Z'}/>
        </div>
        
        {this.state.currentSong && this.renderCurrentSong()}
        <PlayerControls
          playStatus={this.state.playStatus}
          loop={loop}
          onPlay={() => this.setState({ playStatus: Sound.status.PLAYING })}
          onPause={() => this.setState({ playStatus: Sound.status.PAUSED })}
          onResume={() => this.setState({ playStatus: Sound.status.PLAYING })}
          onStop={() => this.setState({ playStatus: Sound.status.STOPPED, position: 0 })}
          onSeek={position => this.setState({ position })}
          onVolumeUp={() => this.setState({ volume: volume >= 100 ? volume : volume + 10 })}
          onVolumeDown={() => this.setState({ volume: volume <= 0 ? volume : volume - 10 })}
          onPlaybackRateUp={() => this.setState({ playbackRate: playbackRate >= 4 ? playbackRate : playbackRate + 0.5 })}
          onPlaybackRateDown={() => this.setState({ playbackRate: playbackRate <= 0.5 ? playbackRate : playbackRate - 0.5 })}
          onToggleLoop={e => this.setState({ loop: !loop })}
          duration={this.state.currentSong ? this.state.currentSong.duration : 0}
          position={this.state.position}
          playbackRate={playbackRate}
          onNext={this.handleNextSong}
          onPrev={this.handlePrevSong}
          onVolumeChange={this.changeVolume}
          onVolume={volume}       
          />
          <SongSelector
          songs={songs}
          selectedSong={this.state.currentSong}
          onSongSelected={this.handleSongSelected}
        />
        {/* <label><input type="checkbox" checked={this.state.controlled} onChange={this.handleControlledComponentChange}/> Controlled Component</label> */}

        {this.state.currentSong && (
          this.state.controlled ? (
            <Sound
              url={this.state.currentSong.url}
              playStatus={this.state.playStatus}
              position={this.state.position}
              volume={volume}
              playbackRate={playbackRate}
              loop={loop}
              onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
              onLoad={() => console.log('Loaded')}
              onPlaying={({ position }) => this.setState({ position })}
              onPause={() => console.log('Paused')}
              onResume={() => console.log('Resumed')}
              onStop={() => console.log('Stopped')}
              onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}
            />
          ) : (
            <Sound
              url={this.state.currentSong.url}
              playStatus={this.state.playStatus}
              playFromPosition={this.state.position}
              volume={volume}
              playbackRate={playbackRate}
              loop={loop}
              onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
              onLoad={() => console.log('Loaded')}
              onPlaying={({ position }) => console.log('Position', position)}
              onPause={() => console.log('Paused')}
              onResume={() => console.log('Resumed')}
              onStop={() => console.log('Stopped')}
              onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}
            />
          )
        )}
      </div>
    );
  }
}
