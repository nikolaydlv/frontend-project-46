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
    const {
      previous, current, value, children,
    } = node;
    const added = generateString(value);
    switch (status) {
      case 'removed':
        return `Property '${path}' was removed`;
      case 'updated':
        return `Property '${path}' was updated. From ${generateString(previous)} to ${generateString(current)}`;
      case 'added':
        return `Property '${path}' was added with value: ${added}`;
      case 'nested':
        return getPlainFormat(children, path);
      default:
        return null;
    }
  }).filter((item) => item).join('\n');
};

export default getPlainFormat;
