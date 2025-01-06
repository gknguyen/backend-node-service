module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  reporters: [
    'default',
    'github-actions',
    [
      'jest-junit',
      {
        outputDirectory: 'report-unit-test',
        outputName: 'jest-junit.xml',
        ancestorSeparator: ' › ',
        suiteNameTemplate: '{filepath}',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
      },
    ],
    [
      'jest-html-reporters',
      {
        publicPath: 'report-unit-test',
        filename: 'jest.html',
        expand: true,
        openReport: false,
      },
    ],
  ],
};
