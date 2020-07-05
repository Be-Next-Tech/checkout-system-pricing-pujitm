require('jest-ts-auto-mock');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // From https://stackoverflow.com/a/54453691/6656631
  moduleDirectories: ['node_modules', 'src'],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
};
