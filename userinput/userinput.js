import inquirer from "inquirer";
async function askInputType() {
  const questionType = await inquirer.prompt({
    name: "attack_type",
    type: "list",
    message: "Chose attack type",
    choices: ["Single Url", "List of Urls"],
  });
  console.clear();
  return questionType;
}
export { askInputType };
