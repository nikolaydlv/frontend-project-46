import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import makeDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('result', () => {
  const result = makeDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const resultPlain = makeDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const resultJson = makeDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  const expectedResult = readFile('correctjsondiff.txt');
  const expectedResultPlain = readFile('correctplaindiff.txt');
  const expectedResultJson = readFile('correctjsonformat.txt');
  expect(result).toEqual(expectedResult);
  expect(resultPlain).toEqual(expectedResultPlain);
  expect(resultJson).toEqual(expectedResultJson);
});

test('yaml/yml comparsion', () => {
  const filepath1 = getFixturePath('filepath1.yml');
  const filepath2 = getFixturePath('filepath2.yml');
  const excpectedYml = readFile('correctyamldiff.txt');
  expect(makeDiff(filepath1, filepath2)).toEqual(excpectedYml);
});
