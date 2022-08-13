module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0.6,
      lines: 10,
      statements: 10,
    } /* ,
    './playground/': {
      branches: 40,
      statements: 40,
    } */,
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(tsx?|jsx?)$',
  testPathIgnorePatterns: ['/scripts/', 'configs', 'common', 'playground/server', 'demo1'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs', 'json', 'node', 'vue'],
  modulePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '@common(.*)$': ['<rootDir>/commons/images/$1', '<rootDir>/commons/layout/$1', '<rootDir>/commons/styles/$1'],
    '@huxy(.*)$': [
      '<rootDir>/playground/huxy/utils/$1',
      '<rootDir>/playground/huxy/components/$1',
      '<rootDir>/playground/huxy/use/$1',
      '<rootDir>/playground/huxy/router/$1',
      '<rootDir>/playground/huxy/layout/$1',
    ],
  },
  transform: {
    // '^.+\\.vue$': 'vue-jest',
    // '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  unmockedModulePathPatterns: ['<rootDir>/node_modules/react/', '<rootDir>/node_modules/react-dom/'],
  collectCoverage: true,
};
