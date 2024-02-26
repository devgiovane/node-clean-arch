// tslint:disable-next-line:no-var-requires
const { compilerOptions } = require('./tsconfig.json');
import { pathsToModuleNameMapper } from 'ts-jest';

export default {
	bail: true,
	clearMocks: true,
	coverageProvider: "v8",
	roots: ["<rootDir>"],
	modulePaths: [compilerOptions.baseUrl],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	preset: 'ts-jest',
	testMatch: [
		"**/__tests__/**/*.[jt]s?(x)",
		"**/?(*.)+(spec|test).[tj]s?(x)"
	]
};
