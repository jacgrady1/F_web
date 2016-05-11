import React from 'react';
import ReactPlayer from 'react-player';
class Video extends React.Component {
    handleClick() {
        this.refs.player.seekTo(1000.1);
    }
    render() {
        return (
            <div>
                <h2>Video</h2>
                <p>Welcome to the site!</p>
                <ReactPlayer url='https://www.youtube.com/watch?v=_r9w3hE0s0U' playing ref='player'/>
                <button onClick={this.handleClick.bind(this)}> seekToButton</button>
                <button className='btn btn-lg btn-primary'> Primay </button>
            </div>
        );
    }
}

export default Video;
