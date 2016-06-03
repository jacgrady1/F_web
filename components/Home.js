import React from 'react';
import AudioPlayer from './AudioPlayer';
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AudioPlayer src="/assets/music/hrzj.mp3"/>
            </div>
        );
    }
}

export default Home;
