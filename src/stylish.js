import _ from 'lodash';

const getIndents = (depth, repeatCount = 4, replacer = ' ') => replacer.repeat(depth * repeatCount);

const stringify = (node, depth = 1) => {
  if (!_.isObject(node)) {
    return String(node);
  }
  const lineIndents = getIndents(depth);
  const closeBraceIndents = getIndents(depth - 1);
  const lines = _.entries(node).map(([key, value]) => `${lineIndents}${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...lines, `${closeBraceIndents}}`].join('\n');
};

const stylish = (nodes, depth = 1) => {
  const lineIndents = getIndents(depth).slice(0, -2);
  const closeBraceIndents = getIndents(depth - 1);
  const lines = nodes.map((node) => {
    const {
      key, status, value, children, previous, current,
    } = node;
    switch (status) {
      case 'removed':
        return `${lineIndents}- ${key}: ${stringify(value, depth + 1)}`;
      case 'added':
        return `${lineIndents}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'unmodified':
        return `${lineIndents}  ${key}: ${stringify(value, depth + 1)}`;
      case 'updated':
        return [
          `${lineIndents}- ${key}: ${stringify(previous, depth + 1)}`,
          `${lineIndents}+ ${key}: ${stringify(current, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${lineIndents}  ${key}: ${stylish(children, depth + 1)}`;
      default:
        throw new Error(`Invalid node status: ${status}!`);
    }
  });
  return ['{', ...lines, `${closeBraceIndents}}`].join('\n');
};

export default stylish;
