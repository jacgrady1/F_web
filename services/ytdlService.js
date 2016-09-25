/*eslint no-console: 0 */
import fs from 'fs';
import youtubedl from 'youtube-dl';
import {fileSizeLimit, fileDurationLimit} from '../configs/configs';
import {convert2Sec} from '../lib/timeUtils';
import {execFile} from 'child_process';

export default {
    name: 'ytdlService',
    create: function create(req, resource, params, payload, config, callback){
        //let cmd = 'ffmpeg -i input.mp4 -vf drawtext="fontfile=Xpressive.ttf: text='placeholder': fontcolor=white: fontsize=24: box=1: boxcolor=black@0.5: boxborderw=5: x=(w-text_w)/3: y=(h-text_h)*2/3" -codec:a copy output.mp4';
        // cmd.replace('placeholder', payload.text);
        //let input = './public/videoInput/' + payload.fileName;
        //let output = './public/videoOutput/' + payload.fileName;
        let input = './public/videoInput/' + payload.fileName;
        let output = './public/videoOutput/' + payload.fileName;
        execFile('./runffmpeg.sh', [payload.text, input, output ], function(error, stdout, stderr){
            if (error) {
                callback(error, null);
            } else {
                fs.unlinkSync(__dirname + '/../public/videoInput/' + payload.fileName);
                callback(null, {
                    fileName: payload.fileName
                });
            }

        });
    },
    read: function(req, resource, params, config, callback) {
        let fileName = params.id + '.mp4';
        youtubedl.getInfo(params.url, function(err, info) {
            if (err) {
                console.log('err:', err);
                callback(err, null);
            }
            let duration = convert2Sec(info.duration);
            let fileTitle = info.title;
            if (duration > fileDurationLimit) {
                // video too long
                callback({message: 'video too long'}, null);
            } else {
                var video = youtubedl(params.url,
                  // Optional arguments passed to youtube-dl.
                  ['--format=18'],
                  // Additional options can be given for calling `child_process.execFile()`.
                  { cwd: __dirname });
                video.pipe(fs.createWriteStream(__dirname + '/../public/videoInput/' + fileName));
                video.on('end', function() {
                    console.log('finished downloading!');
                    callback(null, {
                      title: fileTitle,
                      fileName: fileName
                  });
              });
            }
        });
    }
};
