import BaseStore from 'fluxible/addons/BaseStore';

class VideoStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.fileName = '';
        this.title = '';
        this.outputFileName = '';
        this.startTime = '';
        this.endTime = '';
    }
    handleVideoLoad (payload) {
        this.fileName = payload.fileName;
        this.title = payload.title;
        this.startTime = payload.startTime;
        this.endTime = payload.endTime;
        this.emitChange();
    }
    handleVideoRender(payload){
        this.outputFileName = payload.fileName;
        this.startTime = payload.startTime;
        this.endTime = payload.endTime;
        this.emitChange();
    }
    getOutputFileName() {
        return this.outputFileName;
    }
    getStartTime() {
        return this.startTime;
    }
    getEndTime() {
        return this.endTime;
    }
    getTitle() {
        return this.title;
    }
    getFileName() {
        return this.fileName;
    }
    dehydrate() {
        return {
            fileName: this.fileName,
            title: this.title,
            outputFileName: this.outputFileName,
            startTime: this.startTime,
            endTime: this.endTime
        };
    }
    rehydrate(state) {
        this.fileName = state.fileName;
        this.title = state.title;
        this.outputFileName = state.outputFileName;
        this.startTime = state.startTime;
        this.endTime = state.endTime;
    }
}

VideoStore.storeName = 'VideoStore';
VideoStore.handlers = {
    'LOAD_VIDEO': 'handleVideoLoad',
    'RENDER_VIDEO': 'handleVideoRender'
};

export default VideoStore;
