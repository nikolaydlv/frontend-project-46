import _ from 'lodash';

const genDiffTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);

  return _.sortBy(keys).map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { key, status: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { key, status: 'removed', value: value1 };
    }
    if (_.isEqual(value1, value2)) {
      return { key, status: 'unmodified', value: value2 };
    }
    return (_.isObject(value1) && _.isObject(value2))
      ? { key, status: 'nested', children: genDiffTree(value1, value2) }
      : {
        key, status: 'updated', previous: value1, current: value2,
      };
  });
};

export default genDiffTree;
