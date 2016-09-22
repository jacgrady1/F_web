/*eslint no-console: 0 */
import fs from 'fs';
import youtubedl from 'youtube-dl';
import {fileSizeLimit, fileDurationLimit} from '../configs/configs';
import _ from 'lodash';
import {convert2Sec} from '../lib/timeUtils';
export default {
    name: 'ytdlService',
    read: function(req, resource, params, config, callback) {
        let fileName = params.id + '.mp4';
        youtubedl.getInfo(params.url, ['--format=22'], function(err, info) {
            if (err) throw err;
            let duration = convert2Sec(info.duration);
            let fileTitle = info.title;
            if (duration > fileDurationLimit) {
                // video too long
                callback({message: 'video too long'}, null);
            } else {
                var video = youtubedl(params.url,
                  // Optional arguments passed to youtube-dl.
                  ['--format=22'],
                  // Additional options can be given for calling `child_process.execFile()`.
                  { cwd: __dirname });
                video.pipe(fs.createWriteStream(__dirname + '/../public/videoInput/' + fileName));
                video.on('end', function() {
                    console.log('finished downloading!');
                    callback(null, {
                      title: fileTitle,
                      url: __dirname + '/../public/videoInput/' + fileName
                  });
              });
            }
        });
    }
};
