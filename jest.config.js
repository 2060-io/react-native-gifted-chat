module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/tests/setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)',
  ],
  testMatch: ['**/*.test.ts?(x)'],
  modulePathIgnorePatterns: ['<rootDir>/example'],
  coveragePathIgnorePatterns: ['./src/__tests__/'],
}
