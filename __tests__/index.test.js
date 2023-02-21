import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('result', () => {
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expectedResult = readFile('correctjsondiff.txt');
  expect(result).toEqual(expectedResult);
});

test('yaml/yml comparsion', () => {
  const filepath1 = getFixturePath('filepath1.yml');
  const filepath2 = getFixturePath('filepath2.yml');
  const excpectedYml = readFile('correctyamldiff.txt');
  expect(genDiff(filepath1, filepath2)).toEqual(excpectedYml);
});
