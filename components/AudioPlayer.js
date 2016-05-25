import React from 'react';

class Audioplayer extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlayClicked = this.handlePlayClicked.bind(this);
    }
    handlePlayClicked () {
        var music = this.refs.music;
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }

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
                                    <button type="button" className="btn btn-default" aria-label="Left Align" onClick={this.handlePlayClicked}>
                                        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
                                    </button>
                                <div ref="timeline" id="timeline" onClick={this.onTimelineClick}>
                                            <div ref="playhead" className="playhead"></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Audioplayer;
