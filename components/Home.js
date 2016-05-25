import React from 'react';
import AudioPlayer from './AudioPlayer';
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AudioPlayer />
            </div>
        );
    }
}

export default Home;
