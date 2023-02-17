import yaml from 'js-yaml';

const parse = (filepath) => {
  const extension = filepath.split('.').at(-1);

  switch (extension) {
    case 'json':
      return JSON.parse(filepath);
    case 'yaml':
    case 'yml':
      return yaml.load(filepath);
    default:
      throw new Error('Not supported file extension');
  }
};

export default parse;
