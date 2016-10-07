import React from 'react';
import ReactPlayer from 'react-player';
import VideoActions from '../actions/VideoActions';
import connectToStores from 'fluxible-addons-react/connectToStores';
import VideoStore from '../stores/VideoStore';

class Video extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            fileName: props.fileName,
            title: props.title,
            outputFileName: props.outputFileName,
            startTime: props.startTime.length !== 0 ? props.startTime : '0:0',
            endTime: props.endTime
        };
        this.handleRenderClick = this.handleRenderClick.bind(this);
        this.handleInputUrlPress = this.handleInputUrlPress.bind(this);
        this.handleInputTextChange = this.handleInputTextChange.bind(this);
        this.handleInputStartTime = this.handleInputStartTime.bind(this);
        this.handleInputEndTime = this.handleInputEndTime.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            fileName: nextProps.fileName,
            title: nextProps.title,
            outputFileName: nextProps.outputFileName,
            startTime: nextProps.startTime,
            endTime: nextProps.endTime
        });
        this.refs.video.load();
        this.refs.renderedVideo.load();
    }
    handleRenderClick() {
        let fileName = this.state.fileName;
        let text = this.state.text;
        let startTime = this.state.startTime;
        let endTime = this.state.endTime;
        this.context.executeAction(VideoActions.renderVideo, {
            text: text,
            fileName: fileName,
            startTime: startTime,
            endTime: endTime
        });
    }
    handleInputStartTime(e) {
        this.setState({
            startTime: e.target.value
        });
    }
    handleInputEndTime(e) {
        this.setState({
            endTime: e.target.value
        });
    }
    handleInputUrlPress(e) {
        if (e.key === 'Enter') {
            let url = e.target.value;
            this.context.executeAction(VideoActions.downloadYTVideo, {url: url});
        }
    }
    handleInputTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }
    renderVideo() {
        let src = '/assets/videoInput/' + this.state.fileName;
        return (
            <div>
                <video width="640" height="360" ref="video" controls muted>
                    <source src={src} type="video/mp4" />
                </video>
            </div>
        );
    }
    renderUrlInputs() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <input type="text"
                        className="form-control"
                        onKeyPress={this.handleInputUrlPress}
                        placeholder="Enter Youtube URL" />
                </div>
            </div>
        );
    }
    renderTextInputs() {
        if (this.state.fileName) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text"
                                className="form-control"
                                onChange={this.handleInputTextChange}
                                placeholder="Enter text on video" />
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-2">
                            <input type="text"
                                className="form-control"
                                onChange={this.handleInputStartTime}
                                value={this.state.startTime}
                                placeholder={this.state.startTime} />
                        </div>
                        <div className="col-md-2">
                            <input type="text"
                                className="form-control"
                                onChange={this.handleInputEndTime}
                                value={this.state.endTime}
                                placeholder={this.state.endTime} />
                        </div>
                        <div className="col-md-2">
                            <button className='btn btn-primary' onClick={this.handleRenderClick}> Render </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div/>;
        }
    }
    renderOutPutVideo() {
        let src = '/assets/videoOutput/' + this.state.outputFileName;
        let downloadName = this.state.text ? this.state.text.replace(' ', '_') + '.mp4' : this.state.title.replace(' ', '_') + '.mp4';
        if (this.state.outputFileName) {
            return (
                <div>
                    <div>
                        <video width="640" height="360" ref="renderedVideo" controls muted>
                            <source src={src} type="video/mp4" />
                        </video>
                    </div>
                    <div>
                        <a className="btn btn-primary" href={src} role="button" download={downloadName}>Download</a>
                    </div>
                </div>
            );
        } else {
            return <div/>;
        }

    }
    render() {
        return (
            <div className="container">
                <h2>Video</h2>
                    {this.renderUrlInputs()}
                    <br/>
                    {this.renderVideo()}
                    <br/>
                    {this.renderTextInputs()}
                    <br/>
                    {this.renderOutPutVideo()}
            </div>
        );
    }
}
// REF: https://github.com/yahoo/fluxible/issues/103
Video.contextTypes = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
};
Video = connectToStores(Video, [VideoStore], (context, props) => ({
    title: context.getStore(VideoStore).getTitle(),
    fileName: context.getStore(VideoStore).getFileName(),
    outputFileName: context.getStore(VideoStore).getOutputFileName(),
    startTime: context.getStore(VideoStore).getStartTime(),
    endTime: context.getStore(VideoStore).getEndTime()
}));

Video.defaultProps = {
    title: 'defaultTitle'
};

export default Video;
