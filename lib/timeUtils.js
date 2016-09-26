export default {
    convert2Sec(str) {
        let arr = str.split(':').reverse();
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum = sum + arr[i] * Math.pow(60, i);
        }
        return sum;
    },
    convert2MinSecStr(sec) {
        let minutes = Math.floor(sec / 60);
        let seconds = sec - minutes * 60;
        return (minutes.toString() + ":" + seconds.toString());
    },
    getDuration(start, end) {
        let startTime = start.split(':')
        let startMin = parseInt(startTime[0]);
        let startSec = parseInt(startTime[1]);
        let startTotalSec = startSec + 60*startMin;

        let endTime = end.split(':')
        let endMin = parseInt(endTime[0]);
        let endSec = parseInt(endTime[1]);
        let endTotalSec = endSec + 60*endMin;
        let sec = endTotalSec - startTotalSec;
        let minutes = Math.floor(sec / 60);
        let seconds = sec - minutes * 60;
        return (minutes.toString() + ":" + seconds.toString());



    }
};
