export default {
    convert2Sec(str) {
        let arr = str.split(':').reverse();
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum = sum + arr[i] * Math.pow(60, i);
        }
        return sum;
    }
};
