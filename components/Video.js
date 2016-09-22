import React from 'react';
import ReactPlayer from 'react-player';
import VideoActions from '../actions/VideoActions';
import connectToStores from 'fluxible-addons-react/connectToStores';
import VideoStore from '../stores/VideoStore';

class Video extends React.Component {

    constructor(props, context) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleInputPress = this.handleInputPress.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        //this.setState(this._getState(nextProps));
        console.log('nextProps: ', nextProps);
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
        let src = '/assets/videoInput/' + this.props.fileName;
        console.log('src:', src);
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

// Athletes = connectToStores(Athletes, [AthleteStore, LoadingStore], function(context, props) {
//     var athleteStore = context.getStore(AthleteStore);
//     var loadingStore = context.getStore(LoadingStore);
//     return {
//         athletes: athleteStore.getAthletes(),
//         loading: loadingStore.getLoading()
//     };
// });

Video = connectToStores(Video, [VideoStore], (context, props) => ({
    title: context.getStore(VideoStore).getTitle(),
    fileName: context.getStore(VideoStore).getFileName()
}));

export default Video;

// export default connectToStores(
//     Video,
//     [VideoStore],
//      (context, props) => {
//         let videoStore = context.getStore(VideoStore);
//         console.log("title: ", videoStore.getTitle());
//         console.log("fileName: ", videoStore.getFileName());
//         return {
//             title: videoStore.getTitle(),
//             fileName: videoStore.getFileName()
//         };
//     }
// );
//
// export default Video;
