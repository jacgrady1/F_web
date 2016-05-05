import React from 'react';
import ReactPlayer from 'react-player';
class Home extends React.Component {
    handleClick() {
        this.refs.player.seekTo(1000.1);
    }
    render() {
        return (
            <div>
                <div className = 'row'>
                    <div className = 'col-md-6 col-md-offset-3'>
                        <ReactPlayer url='https://www.youtube.com/watch?v=_r9w3hE0s0U' playing ref='player'/>
                        <button onClick={this.handleClick.bind(this)}> seekToButton</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
