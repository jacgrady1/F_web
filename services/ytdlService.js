/*eslint no-console: 0 */
import fs from 'fs';
import youtubedl from 'youtube-dl';
import {fileSizeLimit, fileDurationLimit} from '../configs/configs';
import {convert2Sec, getDuration, convert2MinSecStr} from '../lib/timeUtils';
import {execFile} from 'child_process';


export default {
    name: 'ytdlService',
    create: function create(req, resource, params, payload, config, callback){
        let input = './public/videoInput/' + payload.fileName;
        let outputFileName = Date.now() + payload.fileName
        let output = './public/videoOutput/' + outputFileName;
        // args: text, inputSource, outputSource, startTime (00:00:03), duration(00:00:08)
        let startTime = payload.startTime;
        let duration = getDuration(payload.startTime, payload.endTime);
        let text = payload.text ? payload.text : ' ';
        execFile('./runffmpeg.sh', [text, input, output, startTime, duration], function(error, stdout, stderr){
            if (error) {
                console.log("error: ", error);
                callback(error, null);
            } else {
                //fs.unlinkSync(__dirname + '/../public/videoInput/' + payload.fileName);
                callback(null, {
                    fileName: outputFileName,
                    startTime: payload.startTime,
                    endTime: payload.endTime
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
            let endTime = convert2MinSecStr(duration);
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
                        fileName: fileName,
                        startTime: '0:0',
                        endTime: endTime
                  });
              });
            }
        });
    }
};
