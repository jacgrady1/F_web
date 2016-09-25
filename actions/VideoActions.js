import inputUtils from '../lib/inputUtils';

export default {
    downloadYTVideo(context, payload, done) {
        let fileId = inputUtils.validateYouTubeUrl(payload.url);
        if (!fileId) { // not valid
            NProgress.start();
            console.log("file id err");
            NProgress.done();
            done();
        } else  {
            NProgress.start();
            let params = {
                id: fileId,
                url: payload.url
            }
            context.service.read('ytdlService', params, {}, function(err, data) {
                if (err) {
                    console.log("service err: ", err);
                    NProgress.done();
                    done();
                    return;
                } else {
                    NProgress.done();
                    NProgress.remove();
                    context.dispatch('LOAD_VIDEO' ,data);
                    done();
                    return;
                }
            });
        }
    },
    renderVideo(context, payload, done) {
        NProgress.start();
        context.service.create('ytdlService', {}, payload, {}, function(err, data) {
            if (err) {
                console.log("service err: ", err);
                NProgress.done();
                done();
                return;
            } else {
                // data is fileName
                NProgress.done();
                NProgress.remove();
                context.dispatch('RENDER_VIDEO' ,data);
                done();
                return;
            }
        });
    }
}
