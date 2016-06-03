import React from 'react';
import {MdPlayArrow, MdPause} from 'react-icons/lib/md';

class Audioplayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.trackTitle,
            srcMp3: props.srcMp3,
            srcOgg: props.oggSource,
            isPlaying: props.isPlaying ? true : false,
            currentTime: 0,
            duration: 0,
            volume: props.volume ? props.volume : 0.7,
            isMute: props.isMute ? props.isMute : false
        };
        this.handlePlayClicked = this.handlePlayClicked.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.handleMediaEnd = this.handleMediaEnd.bind(this);
    }
    componentDidMount() {
        var self = this;
        var audioElement = self.refs.music;
        audioElement.volume = self.state.volume;
        // TODO handle resize
        audioElement.addEventListener('progress', self.updateProgress);
        audioElement.addEventListener('timeupdate', self.updateProgress);
        audioElement.addEventListener('ended', self.handleMediaEnd);
        self.setState({
            duration: audioElement.duration
        });
    }
    componentWillUnmount() {
        var self = this;
        var audioElement = self.refs.music;
        audioElement.removeEventListener('progress', self.updateProgress);
        audioElement.removeEventListener('timeupdate', self.updateProgress);
        audioElement.removeEventListener('ended', self.handleMediaEnd);
    }
    // button change
    handleMediaEnd() {
        this.setState({isPlaying: false});
    }
    handlePlayClicked () {
        var self = this;
        var music = self.refs.music;
        if (self.state.isPlaying) {
            music.pause();
            self.setState({isPlaying: false});
        } else {
            music.play();
            self.setState({isPlaying: true});
        }
    }
    // Synchronizes playhead position with current point in audio
    updateProgress() {
        var music = this.refs.music;
        var timeline = this.refs.timeline;
        var playhead = this.refs.playhead;
        var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
        var playPercent = timelineWidth * (music.currentTime / music.duration);
        playhead.style.marginLeft = playPercent + 'px';
        //if (music.currentTime == music.duration) {
            //self.setState({isPlaying: false});
        //}
    }
    // Moves playhead as user drags
    moveplayhead(e) {
        var music = this.refs.music;
        var timeline = this.refs.timeline;
        var playhead = this.refs.playhead;
        var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
        var newMargLeft = e.pageX - timeline.offsetLeft;
        if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
            playhead.style.marginLeft = newMargLeft + 'px';
        }
        if (newMargLeft < 0) {
            playhead.style.marginLeft = '0px';
        }
        if (newMargLeft > timelineWidth) {
            playhead.style.marginLeft = timelineWidth + 'px';
        }
    }
    renderButton() {
        if (this.state.isPlaying === true) {
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
        console.log(this.state.duration);
        return (
            <div>
                <div className = 'row'>
                    <div className = 'col-md-6 col-md-offset-3'>
                        <div>
                            <h3>A piece of music</h3>
                            <audio controls ref="music" src={this.state.srcMp3}>
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
