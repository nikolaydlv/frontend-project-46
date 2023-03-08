import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import makeDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('default result', () => {
  const result = makeDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expectedResult = readFile('correctStylishDiff.txt');
  expect(result).toEqual(expectedResult);
});

test('stylish format', () => {
  const resultStylish = makeDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  const expectedResultStylish = readFile('correctStylishDiff.txt');
  expect(resultStylish).toEqual(expectedResultStylish);
});

test('plain format', () => {
  const resultPlain = makeDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const expectedResultPlain = readFile('correctPlainDiff.txt');
  expect(resultPlain).toEqual(expectedResultPlain);
});

test('json format', () => {
  const resultJson = makeDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  const expectedResultJson = readFile('correctJsonDiff.txt');
  expect(resultJson).toEqual(expectedResultJson);
});

test('yaml/yml comparsion', () => {
  const filepath1 = getFixturePath('filepath1.yml');
  const filepath2 = getFixturePath('filepath2.yml');
  const excpectedYml = readFile('correctYamlDiff.txt');
  expect(makeDiff(filepath1, filepath2)).toEqual(excpectedYml);
});
