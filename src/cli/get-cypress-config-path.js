import fs from "fs";

export const getCypressConfigPath = () => {
  const PWD = process.env.PWD;

  const cypressConfigPath = `${PWD}/cypress.json`;

  return fs.existsSync(cypressConfigPath)
    ? cypressConfigPath
    : `${PWD}/package.json`;
};
