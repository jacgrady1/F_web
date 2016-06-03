import React from 'react';
import {MdPlayArrow, MdPause} from 'react-icons/lib/md';

class Audioplayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            src: props.src
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
    componentDidMount() {
        var self = this;
        var music = this.refs.music;
        var timeline = this.refs.timeline;
        var playhead = this.refs.playhead;
        var bufferbar = this.refs.bufferbar;
        music.ontimeupdate = function() {
            var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
            var playPercentWidth = timelineWidth * (music.currentTime / music.duration);
            var bufferPercentWidth = timelineWidth * (music.buffered.end(0) / music.duration);
            playhead.style.marginLeft = playPercentWidth + 'px';
            bufferbar.style.width = bufferPercentWidth + 'px';
            if (music.currentTime === music.duration) {
                playhead.style.marginLeft = '0px';
                self.setState({playing: false});
            }
            // console.log(music.currentTime);
            // console.log(music.duration);
            // console.log(music.buffered.end(0));
        };
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
        let playheadProps = {
            ref: 'playhead',
            className: 'playhead W(8px) Pos(a) H(8px) Bdrs(50%) Mt(1px) Bgc(#333)',
            onMouseDown: function() {

            }
        };
        let bufferbarProps = {
            ref: 'bufferbar',
            className: 'bufferbar W(0px) Pos(a) H(10px) Fl(start) Bdrs(15px) Bgc(#26a69a)'
        };
        return (<div ref="timeline" className = "W(400px) H(10px) Mt(10px) Pos(r) Fl(start) Bdrs(15px) Bgc(#acece6)" onClick={this.onTimelineClick}>
                    <div {...bufferbarProps} />
                    <div {...playheadProps} />
                </div>);
    }
    render() {
        return (
            <div>
                <div className = 'row'>
                    <div className = 'col-md-6 col-md-offset-3'>
                        <div>
                            <h3>A piece of music</h3>
                            <audio controls ref="music" src={this.state.src}>
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
