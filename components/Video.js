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
            outputFileName: props.outputFileName
        };
        this.handleRenderClick = this.handleRenderClick.bind(this);
        this.handleInputUrlPress = this.handleInputUrlPress.bind(this);
        this.handleInputTextChange = this.handleInputTextChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            fileName: nextProps.fileName,
            title: nextProps.title,
            outputFileName: nextProps.outputFileName
        });
        this.refs.video.load();
        this.refs.renderedVideo.load();
    }
    handleRenderClick() {
        let fileName = this.state.fileName;
        let text = this.state.text;
        this.context.executeAction(VideoActions.renderVideo, {
            text: text,
            fileName: fileName
        });
    }
    handleDownloadClick() {

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
                <div className="row">
                    <div className="col-md-5">
                        <input type="text"
                            className="form-control"
                            onKeyPress={this.handleInputTextChange}
                            placeholder="Enter text on video" />
                    </div>
                    <div className="col-md-1">
                        <button className='btn btn-primary' onClick={this.handleRenderClick}> Render </button>
                    </div>
                </div>
            );
        } else {
            return <div/>;
        }
    }
    renderOutPutVideo() {
        let src = '/assets/videoOutput/' + this.state.outputFileName;
        if (this.state.outputFileName) {
            return (
                <div>
                    <div>
                        <video width="640" height="360" ref="renderedVideo" controls muted>
                            <source src={src} type="video/mp4" />
                        </video>
                    </div>
                    <div>
                        <a className="btn btn-primary" href={src} role="button" download>Download</a>
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
                    {this.renderVideo()}
                    {this.renderTextInputs()}
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
    outputFileName: context.getStore(VideoStore).getOutputFileName()
}));

export default Video;
