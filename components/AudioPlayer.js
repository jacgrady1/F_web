import React from 'react';
import {MdPlayArrow, MdPause} from 'react-icons/lib/md';

class Audioplayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false
        };
        this.handlePlayClicked = this.handlePlayClicked.bind(this);
    }
    handlePlayClicked () {
        var music = this.refs.music;
        if (music.paused) {
            music.play();
            this.setState({playing: true});
        } else {
            music.pause();
            this.setState({playing: false});
        }
    }
    renderButton() {
        if (this.state.playing === true) {
            return (<div>
                        <MdPause className="pause Fz(200%) Scale(2.0, 2.0) Fl(start)" onClick={this.handlePlayClicked} />
                    </div>);
        } else {
            return (<div>
                        <MdPlayArrow className="play Fz(200%) Scale(2.0, 2.0) Fl(start)" onClick={this.handlePlayClicked} />
                    </div>);
        }
    }
    renderTimeLine() {
    // dark color #26a69a
        return (<div id="timeline" className = "W(400px) H(10px) Mt(10px) Fl(start) Bdrs(15px) Bgc(#acece6)" onClick={this.onTimelineClick}>
                    <div className="playhead W(8px) H(8px) Bdrs(50%) Mt(1px) Bgc(#333)"></div>
                </div>);
    }
    render() {
        return (
            <div>
                <div className = 'row'>
                    <div className = 'col-md-6 col-md-offset-3'>
                        <div>
                            <h3>A piece of music</h3>
                            <audio controls ref="music" src="/assets/music/hrzj.mp3">
                            <p>Your browser does not support the <code>audio</code> element </p>
                            </audio>
                            <div id="audioplayer">
                                {this.renderButton()}
                                {this.renderTimeLine()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Audioplayer;
