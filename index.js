import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";
import fs from "fs";
import { makeHttpRequest, createFile } from "./requestmaking.js";

import async from "async";
console.clear();
console.log(gradient.pastel.multiline(figlet.textSync("Bruteforce Attacker")));

const questionType = await inquirer.prompt({
  name: "attack_type",
  type: "list",
  message: "Chose attack type",
  choices: ["Single Url", "List of Urls"],
});
console.clear();

if (questionType.attack_type === "Single Url") {
  const urli = await inquirer.prompt({
    name: "url",
    type: "input",
    message: "Enter your Url",
  });
  const url = urli.url;
  const filei = await inquirer.prompt({
    name: "file",
    type: "input",
    message: "Enter your file path or drag the file into the terminal",
  });
  const filePath = filei.file;

  try {
    const data = fs.readFileSync(filePath, "utf8");
    data.split(/\r?\n/).forEach(async (line) => {
      await makeHttpRequest(url, line);
    });
  } catch (err) {
    // console.error("Some error occured while reading the file");
  }
  ////////////////////////////
} else {
  let urllist = [];
  let urli = "";
  let urli2 = {};
  while (urli2.url !== "q") {
    urli2 = await inquirer.prompt({
      name: "url",
      type: "text",
      message:
        "Enter your Url's one by one and press enter to add another url or press q to finish",
    });
    if (urli2.url !== "q" && urli2 !== "") {
      urllist.push(urli2.url);
    }
  }

  if (urllist.length == 0) {
    console.log("No url's provided, quitting the program");
    //quit the program
    process.exit(code);
  }
  const filei = await inquirer.prompt({
    name: "file",
    type: "text",
    message: "Enter your file path or drag the file into the terminal",
  });

  const filePath = filei.file;
  try {
    urllist.forEach(async (url) => {
      let domain = new URL(url);
      domain = domain.hostname.replace("www.,com", "");
      await createFile(domain);
      const data = fs.readFileSync(filePath, "utf8");
      data.split(/\r?\n/).forEach(async (line) => {
        async.parallel({
          try(callback) {
            makeHttpRequest(url, line);
          },
          catch(e) {
            // console.log("Problem in parallel callback");
          },
        });
      });
    });
  } catch (e) {}
}

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
