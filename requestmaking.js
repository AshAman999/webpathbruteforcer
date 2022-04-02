import https from "https";
import fs from "fs";

async function makeHttpRequest(url, param) {
  try {
    let domain = new URL(url);
    domain = domain.hostname.replace("www.,com", "");
    await https
      .get(`${url}${param}`, (resp) => {
        if (resp.statusCode === 200 || resp.statusCode == 302) {
          write(url, param,domain);
        } // 200
        else {
          // console.log(`Nothing found for ${url}${param}`);
        }
      })
      .on("error", (err) => {
        // console.log("Something went wrong while makin api call: ");
      });
  } catch (err) {
    // console.log("Something went wrong while making the api call");
  }
}


async function createFile(domain) {
  var logger = await fs.createWriteStream(`${domain}.txt`, {
    flags: "a",
  });
  logger.write("The followring url was found out there in the web: \n\n");
}

function write(url, param,domain) {
  var logger = fs.createWriteStream(`${domain}.txt`, {
    flags: "a",
  });
  logger.write(`${url}${param}\n`);
}
//export all the modules
export { makeHttpRequest, createFile };

