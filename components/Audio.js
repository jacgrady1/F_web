import React from 'react';

class Audio extends React.Component {
    render() {
        return (
            <div>
                <div className = 'row'>
                    <div className = 'col-md-6 col-md-offset-3'>
                        <div>
                            <h3>A piece of audio music</h3>
                            <audio controls ref="music" src="http://www.alexkatz.me/codepen/music/interlude.mp3">
                            <p>Your browser does not support the <code>audio</code> element </p>
                            </audio>
                            <div id="audioplayer">
                                    <button type="button" className="btn btn-default" aria-label="Left Align">
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

export default Audio;
