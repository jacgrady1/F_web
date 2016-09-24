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
            title: props.title
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputPress = this.handleInputPress.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            fileName: nextProps.fileName,
            title: nextProps.title
        });
        this.refs.video.load();
        this.refs.video.play();
    }
    handleClick() {
        console.log('clicked test');
    }
    handleInputPress(e) {
        if (e.key === 'Enter') {
            let url = e.target.value;
            this.context.executeAction(VideoActions.downloadYTVideo, {url: url});
        }
    }
    render() {
        let src = '/assets/videoInput/' + this.state.fileName;
        return (
            <div className="container">
                <h2>Video</h2>
                    <div className="row">
                        <div className="col-md-4">
                            <input type="text"
                                className="form-control"
                                onKeyPress={this.handleInputPress}
                                placeholder="Enter Youtube URL" />
                        </div>
                    </div>
                    <div>
                        <video width="320" height="240" ref="video" controls>
                            <source src={src} type="video/mp4" />
                        </video>
                    </div>
                <button className='btn btn-primary' onClick={this.handleClick}> Test </button>
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
    fileName: context.getStore(VideoStore).getFileName()
}));

export default Video;
