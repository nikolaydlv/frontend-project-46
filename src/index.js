import _ from 'lodash';
import fs from 'fs';

export default (filepath1, filepath2) => {
    const data1 = fs.readFileSync(filepath1, 'utf-8');
    const data2 = fs.readFileSync(filepath2, 'utf-8');
    
    const dataParse1 = JSON.parse(data1);
    const dataParse2 = JSON.parse(data2);

    return genDiff(dataParse1, dataParse2);
    };
    

const genDiff = (data1, data2 ) => {
    const result = []
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.union(keys1, keys2);
    for (const key of keys) {
        if (_.has(data1, key) && !_.has(data2, key)) {
            result.push(`\n  - ${key}: ${data1[key]}`);
        }
        if (_.has(data1, key) === _.has(data2, key) && data1[key] === data2[key]) {
            result.push(`\n    ${key}: ${data1[key]}`);
        }
        if (_.has(data1, key) === _.has(data2, key) && data1[key] !== data2[key]) {
            result.push(`\n  - ${key}: ${data1[key]}`);
            result.push(`\n  + ${key}: ${data2[key]}`);
        }
        if (!_.has(data1, key) && _.has(data2, key)) {
            result.push(`\n  + ${key}: ${data2[key]}`);
        }   
    }
    result.sort((a,b) => a.charCodeAt(5) - b.charCodeAt(5));
    return `{${result.join('')}\n}`; 
};








