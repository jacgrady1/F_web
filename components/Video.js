import React from 'react';
import ReactPlayer from 'react-player';
import VideoActions from '../actions/VideoActions';
class Video extends React.Component {

    constructor(props, context) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleInputPress = this.handleInputPress.bind(this);
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
                        <video width="320" height="240" controls>
                            <source src="/assets/videoInput/TDwJDRbSYbw.mp4" type="video/mp4" />
                        </video>
                    </div>
                <button className='btn btn-primary' onClick={this.handleClick}> Test </button>
            </div>
        );
    }
}

Video.contextTypes = {
    getStore: React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
};

export default Video;
