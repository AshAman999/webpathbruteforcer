import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";
import fs from "fs";
import { makeHttpRequest, createFile } from "./requestmaking.js";

import async from "async";
import { askInputType } from "./userinput/userinput.js";
import { askSingleUrl } from "./userinput/askSingleUrl.js";
import { askStatuscode } from "./userinput/askStatusCodeList.js";
import { askFilePath } from "./userinput/askFilePath.js";
import { askUrlList } from "./userinput/askUrlList.js";

await mainwork().then(() => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    `The script uses approximately ${Math.round(used * 100) / 100} MB`
  );
  const cpu = process.cpuUsage();
  console.log(
    `The script uses approximately ${Math.round(cpu.user / 100) / 100} % CPU`
  );

  console.log("Finished");
});

async function mainwork() {
  try {
    console.clear();
    console.log(
      gradient.pastel.multiline(figlet.textSync("Bruteforce Attacker"))
    );
    const questionType = await askInputType();
    if (questionType.attack_type === "Single Url") {
      const url = await askSingleUrl();
      let statusCodeList = await askStatuscode();

      if (statusCodeList.length == 0) {
        console.log("No Status Codeprovided provided, quitting the program");
        //quit the program
        process.exit(code);
      }
      const filePath = await askFilePath();

      try {
        let domain = new URL(url.url);
        console.log(url.url);
        domain = domain.hostname.replace("www.,com", "");
        await createFile(domain);
        const data = fs.readFileSync(filePath, "utf8");
        data.split(/\r?\n/).forEach(async (line) => {
          await makeHttpRequest(url.url, line, statusCodeList);
        });
      } catch (err) {
        console.error(err);
      }
      ////////////////////////////
    } else {
      let urllist = await askUrlList();
      if (urllist.length == 0) {
        console.log("No url's provided, quitting the program");
        //quit the program
        process.exit(code);
      }
      /////////////////

      let statusCodeList = await askStatuscode();

      if (statusCodeList.length == 0) {
        console.log("No Status Codeprovided provided, quitting the program");
        //quit the program
        process.exit(code);
      }

      const filePath = await askFilePath();
      try {
        urllist.forEach(async (url) => {
          let domain = new URL(url);
          domain = domain.hostname.replace("www.,com", "");
          await createFile(domain);
          const data = fs.readFileSync(filePath, "utf8");
          data.split(/\r?\n/).forEach(async (line) => {
            async.parallel({
              try(callback) {
                makeHttpRequest(url, line, statusCodeList);
              },
              catch(e) {
                // console.log("Problem in parallel callback");
              },
            });
          });
        });
      } catch (e) {}
    }
  } catch (e) {}
}
