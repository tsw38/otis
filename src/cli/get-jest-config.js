import fs from "fs";

export const getJestConfig = () => {
  const PWD = process.env.PWD;

  const jestConfigPath = `${PWD}/jest.config.json`;

  return fs.existsSync(jestConfigPath) ? jestConfigPath : `${PWD}/package.json`;
};
