module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: [
    '**/__tests__/**/*.spec.[jt]s?(x)',
    '**/tests/unit/**/*.spec.[jt]s?(x)',
  ],
};