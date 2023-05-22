// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  rootDir: '..',
  setupFilesAfterEnv: ['<rootDir>/config/jest-setup.ts'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/utility/',
    '/src/components/sidebar',
    '/*/index',
  ],
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/components$1',
    '^@/ui(.*)$': '<rootDir>/src/ui$1',

    '^@/utility$': '<rootDir>/src/utility/index',
    '^@/assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/layouts/$1',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
