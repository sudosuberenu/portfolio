import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/'],
  moduleFileExtensions: ['ts', 'js'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|build)[/\\\\]'],
  // silent: false,
};

export default config;