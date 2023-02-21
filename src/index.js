/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import parse from './parser.js';
import genDiffTree from './genDiffTree.js';
import stylish from './stylish.js';

export const getExtension = (filename) => filename.split('.').filter(String).at(-1);
export const getData = (filepath) => fs.readFileSync(filepath, 'utf-8');

const makeDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const parsedData1 = parse(data1, getExtension(filepath1));
  const parsedData2 = parse(data2, getExtension(filepath2));
  const diffTree = genDiffTree(parsedData1, parsedData2);
  return stylish(diffTree);
};
export default makeDiff;
