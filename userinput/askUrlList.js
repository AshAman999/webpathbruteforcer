import inquirer from "inquirer";

async function askUrlList() {
  let urlList = [];
  let url = {};
  while (url.url !== "q") {
    url = await inquirer.prompt({
      name: "url",
      type: "text",
      message:
        "Enter a url,press enter to add another url or press q to finish",
    });
    if (url.url !== "q" && url !== "") {
      urlList.push(url.url);
    }
  }
  return urlList;
}
export { askUrlList };
