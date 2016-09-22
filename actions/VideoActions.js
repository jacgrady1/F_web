import inputUtils from '../lib/inputUtils';

export default {
    downloadYTVideo(context, payload, done) {
        console.log("payload: ", payload);
        let fileId = inputUtils.validateYouTubeUrl(payload.url);
        if (!fileId) { // not valid
            console.log("file id err");
            done();
        } else  {
            console.log('fileId: ', fileId);
            let params = {
                id: fileId,
                url: payload.url
            }
            context.service.read('ytdlService', params, {}, function(err, data) {
            if (err) {
                console.log("service err: ", err);
                done();
                return;
            } else {
                // data = {title: 'goodvideo', url: '.../xfdafd.mp4'};
                context.dispatch('LOAD_VIDEO' ,data);
            }
            done();
        });
        }

    }
};
