import inquirer from "inquirer";

async function askSingleUrl() {
  const question = inquirer.prompt({
    name: "url",
    type: "text",
    message: "Enter your url",
  });
  return question;
}

export { askSingleUrl };
