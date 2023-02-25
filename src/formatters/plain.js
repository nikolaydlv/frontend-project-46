import _ from 'lodash';

const generateString = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  if (_.isString(item)) {
    return `'${item}'`;
  }
  return item;
};

const getPlainFormat = (data, parent = '') => {
  const clone = _.cloneDeep(data);

  return clone.map((node) => {
    const { status, key } = node;
    const path = [parent, key].filter((item) => item).join('.');
    if (status === 'removed') {
      return `Property '${path}' was removed`;
    }
    if (status === 'updated') {
      const { previous, current } = node;
      return `Property '${path}' was updated. From ${generateString(previous)} to ${generateString(current)}`;
    }
    if (status === 'added') {
      const { value } = node;
      const added = generateString(value);
      return `Property '${path}' was added with value: ${added}`;
    }
    const { children } = node;
    return status === 'nested' ? getPlainFormat(children, path) : null;
  }).filter((item) => item).join('\n');
};

export default getPlainFormat;
