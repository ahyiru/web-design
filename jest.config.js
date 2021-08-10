module.exports={
  verbose:true,
  testEnvironment:'jsdom',
  coverageThreshold:{
    global:{
      branches:0,
      functions:1,
      lines:10,
      statements:10,
    }/* ,
    './playground/':{
      branches:40,
      statements:40,
    } */,
  },
  coveragePathIgnorePatterns:['/node_modules/'],
  testRegex:'(/__tests__/.*\\.(test|spec))\\.(tsx?|jsx?)$',
  testPathIgnorePatterns:['/scripts/','configs','common','playground/server'],
  moduleFileExtensions:['js','jsx','ts','tsx','mjs','json','node','vue'],
  modulePathIgnorePatterns:['/node_modules/'],
  moduleNameMapper:{
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':'<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$':'<rootDir>/__mocks__/styleMock.js',
    '@common(.*)$':'<rootDir>/commons/$1',
    '@src(.*)$':'<rootDir>/playground/src/$1',
  },
  transform:{
    // '^.+\\.vue$': 'vue-jest',
    // '^.+\\.tsx?$':'ts-jest',
    '^.+\\.jsx?$':'babel-jest',
  },
  transformIgnorePatterns:['/node_modules/'],
  unmockedModulePathPatterns:['<rootDir>/node_modules/react/','<rootDir>/node_modules/react-dom/'],
  collectCoverage: true,
};




















    