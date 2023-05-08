const nextJest = require('next/jest')
const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
    collectCoverage: true,
    collectCoverageFrom: ["./**/*spec.test.{js,jsx,ts,tsx}"],
    testMatch: ["./**/*spec.test.{js,jsx,ts,tsx}"],
    "coverageThreshold": {
        "global": {
          "lines": 90
        }
    },
    coverageDirectory: "coverage",
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ["<rootDir>/jest/jest.setup.ts"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest/mock/empty.js",
        "\\.(css|less|scss)$": "<rootDir>/jest/mock/style.js"
    }
}

module.exports = createJestConfig(customJestConfig)