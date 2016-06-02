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
                        <MdPause className="pause Fz(200%) Scale(2.0, 2.0)" onClick={this.handlePlayClicked} />
                    </div>);
        } else {
            return (<div>
                        <MdPlayArrow className="play Fz(200%) Scale(2.0, 2.0)" onClick={this.handlePlayClicked} />
                    </div>);
        }
    }
    renderTimeLine() {
    //     border-radius: 15px;
	// background: rgba(0,0,0,.3);
    // dark color #26a69a
        return (<div id="timeline" className = "W(400px) H(20px) Mt(20px) Fl(start) Bdrs(15px) Bgc(#acece6)" onClick={this.onTimelineClick}>
                    <div ref="playhead" className="playhead"></div>
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
