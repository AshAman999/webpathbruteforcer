import inquirer from "inquirer";
async function askFilePath() {
  const filei = await inquirer.prompt({
    name: "file",
    type: "input",
    message: "Enter your file path or drag the file into the terminal",
  });
  const filePath = filei.file;
  return filePath;
}
export { askFilePath };