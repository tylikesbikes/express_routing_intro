const errors = require('./errors');

function mean(nums) {
    return nums.reduce((a,b) => {return a+b})/nums.length
}

function median(nums) {
    // if an array is an odd number length [1,2,3,4,5,6,7] then the median will be int(length/2);
    // if array length is an even number like [1,2,3,4] then median will be mean of (length/2)-1 and length/2
    nums.sort((a,b) => a - b);

    if (nums.length % 2 === 0) {
        let leftOfMiddle = nums[(nums.length/2)-1];
        let rightOfMiddle = nums[(nums.length/2)];
        return mean([leftOfMiddle, rightOfMiddle]);
    } else {
        return nums[(nums.length/2)|0];
    }
}

function mode(nums) {
    const frequencies = new Map();
    for (let n of nums) {
        if (frequencies.has(n)) {
            frequencies.set(n, frequencies.get(n)+1);
        } else {
            frequencies.set(n,1);
        }
    }

    let maxFreq = Math.max(...frequencies.values());
    if (maxFreq === 1) {
        return 'No Mode';
    } else {
        let mode = [];
        for (f of frequencies) {
            if (f[1] === maxFreq) {
                mode.push(f[0])
            }
        }
        return mode;
    }
}

function generateResponse(op, arr) {
    if (op === 'mode') {
        return {response:{'operation':'mode', 'value':mode(arr)}}
    } else if (op === 'median') {
        return {response:{'operation':'median', 'value':median(arr)}}
    } else if (op === 'mean') {
        return {response:{'operation':'mean','value':mean(arr)}}
    } else {
        return {response:'invalid operation'}}
}

function numStringToIntArray(numString) {
    if (!numString) {
            throw new errors.ExpressError('nums are required', 400);
    }
    const nums = numString.split(',');
    for (let i = 0; i < nums.length; i++) {
        nums[i] = parseInt(nums[i])
    }
    if (nums.includes(NaN)) {
        return undefined;
    }
    return nums;
}

module.exports = {mean, median, mode, generateResponse, numStringToIntArray};