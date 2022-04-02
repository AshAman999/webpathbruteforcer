import inquirer from "inquirer";

async function askStatuscode(){
    let statusCodeList = [];
    let statusCode = {};
  while (statusCode.statusCode !== "q") {
    statusCode = await inquirer.prompt({
      name: "statusCode",
      type: "text",
      message:
        "Enter status code to consider valid press enter to add another url or press q to finish",
    });
    if (statusCode.statusCode !== "q" && statusCode !== "") {
      statusCodeList.push(statusCode.statusCode);
    }
  }
  return statusCodeList;
}
export { askStatuscode };