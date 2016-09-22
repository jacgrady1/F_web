/*eslint no-console: 0 */
import fs from 'fs';
import youtubedl from 'ytdl-core';

export default {
    name: 'ytdlService',
    read: function(req, resource, params, config, callback) {
        let fileName = params.id + '.mp4';
        let ytdlConf = {
            filter: function(format) {
                return format.encoding === 'H.264';
            }
        };
        console.log(__dirname);
        // TODO: save the public or save to aliyun.
        youtubedl(params.url, ytdlConf).pipe(fs.createWriteStream(__dirname + '/../public/videoInput/' + fileName));
        console.log("here");
        callback(null, fileName);
    }
};
