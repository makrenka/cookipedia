/**@type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",

  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },

  transformIgnorePatterns: ["node_modules/(?!.pnpm|superjson)"],

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",

    "^@cookipedia/shared$": "<rootDir>/../shared/src/index.ts",

    "^@cookipedia/shared/(.*)$": "<rootDir>/../shared/src/$1",
  },
};
