import fs from "fs";

const CWD = process.cwd();
const gitignorePath = `${CWD}/.gitignore`;

const updateGitignore = (fileNames) => {
  const gitignore = fs.readFileSync(gitignorePath, "utf-8").split("\n");

  fileNames.forEach((name) => {
    if (!gitignore.includes(name)) {
      gitignore.push(name);
      gitignore.push(`${name}.map`);
    }
  });

  fs.writeFileSync(gitignorePath, gitignore.join("\n"), "utf-8");
};

export default updateGitignore;
