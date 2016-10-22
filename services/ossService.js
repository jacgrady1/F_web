/*eslint no-console: 0 */
import fs from 'fs';
import ALY from 'aliyun-sdk';

export default {
    name: 'ossService',
    create: function create(req, resource, params, payload, config, callback){
        var ossStream = require('aliyun-oss-upload-stream')(new ALY.OSS({
            accessKeyId: 'LTAIusdNpq7wCQKX',
            secretAccessKey: 'TkPl85Pm0rGvXv171Lk6utrbhhBwl2',
            // use external for dev?
            endpoint: 'https://oss-us-west-1.aliyuncs.com', //oss-us-west-1-internal.aliyuncs.com
            region: 'oss-us-west-1',
            apiVersion: '2013-10-15'
        }));
        var upload = ossStream.upload({
            Bucket: 'tftdev',
            Key: payload.fileName
        });
        upload.minPartSize(1048576); // 1M，表示每块part大小至少大于1M

        upload.on('error', function (error) {
          console.log('error:', error);
        });

        upload.on('part', function (part) {
          console.log('part:', part);
        });

        upload.on('uploaded', function (details) {
            var s = (new Date() - startTime) / 1000;
            console.log('details:', details);
            console.log('Completed upload in %d seconds', s);
            callback(null, true);
        });
        var read = fs.createReadStream(payload.path);
        read.pipe(upload);
        var startTime = new Date();

        // let input = './public/videoInput/' + payload.fileName;
        // let outputFileName = Date.now() + payload.fileName
        // let output = './public/videoOutput/' + outputFileName;
        // // args: text, inputSource, outputSource, startTime (00:00:03), duration(00:00:08)
        // let startTime = payload.startTime;
        // let duration = getDuration(payload.startTime, payload.endTime);
        // let text = payload.text ? payload.text : ' ';
        // execFile('./runffmpeg.sh', [text, input, output, startTime, duration], function(error, stdout, stderr){
        //     if (error) {
        //         console.log("error: ", error);
        //         callback(error, null);
        //     } else {
        //         //fs.unlinkSync(__dirname + '/../public/videoInput/' + payload.fileName);
        //         console.log("outputFileName: ", outputFileName);
        //         callback(null, {
        //             fileName: outputFileName,
        //             startTime: payload.startTime,
        //             endTime: payload.endTime
        //         });
        //     }
        //
        // });
    }
};
