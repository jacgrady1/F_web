import BaseStore from 'fluxible/addons/BaseStore';

class VideoStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.fileName = '';
        this.title = '';
    }
    handleVideoLoad (payload) {
        this.fileName = payload.fileName;
        this.title = payload.title;
        this.emitChange();
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
            title: this.title
        };
    }
    rehydrate(state) {
        this.fileName = state.fileName;
        this.title = state.title;
    }
}

VideoStore.storeName = 'VideoStore';
VideoStore.handlers = {
    'LOAD_VIDEO': 'handleVideoLoad'
};

export default VideoStore;
