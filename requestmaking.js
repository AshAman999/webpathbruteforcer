import https from "https";
import fs from "fs";

async function makeHttpRequest(url, param, statusCodeList) {
  try {
    let domain = new URL(url);
    domain = domain.hostname.replace("www.,com", "");
    await https
      .get(`${url}${param}`, (resp) => {
        // 200
        if (statusCodeList.length === 1) {
          write(url, param, domain, statusCodeList[0]);
        } else {
          statusCodeList.forEach((element) => {
            if (element == resp.statusCode) {
              write(url, param, domain, element);
            }
          });
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

function write(url, param, domain, statusCode) {
  var logger = fs.createWriteStream(`${domain}.txt`, {
    flags: "a",
  });
  logger.write(`${url}${param} == returned ${statusCode}\n`);
}
//export all the modules
export { makeHttpRequest, createFile };
