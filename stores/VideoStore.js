import BaseStore from 'fluxible/addons/BaseStore';

class VideoStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.fileName = '';
        this.title = '';
        this.outputFileName = '';
    }
    handleVideoLoad (payload) {
        this.fileName = payload.fileName;
        this.title = payload.title;
        this.emitChange();
    }
    handleVideoRender(payload){
        this.outputFileName = payload.fileName;
        this.emitChange();
    }
    getOutputFileName() {
        return this.outputFileName;
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
            outputFileName: this.outputFileName
        };
    }
    rehydrate(state) {
        this.fileName = state.fileName;
        this.title = state.title;
        this.outputFileName = state.outputFileName;
    }
}

VideoStore.storeName = 'VideoStore';
VideoStore.handlers = {
    'LOAD_VIDEO': 'handleVideoLoad',
    'RENDER_VIDEO': 'handleVideoRender'
};

export default VideoStore;
