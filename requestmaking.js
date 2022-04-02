import https from "https";
import fs from "fs";

async function makeHttpRequest(url, param) {
  try {
    await https
      .get(`${url}${param}`, (resp) => {
        if (resp.statusCode === 200 || resp.statusCode == 302) {
          console.log(resp.statusCode);
          console.log("Something was found out there in the web");
          let domain = new URL(url);
          domain = domain.hostname.replace("www.,com", "");
          console.log(domain);
          var logger = fs.createWriteStream(`${domain}.txt`, {
            flags: "a",
          });
          logger.write(`${url}${param}`);
          logger.write(`\n`);
        } // 200
        else {
          console.log(`Nothing found for ${url}${param}`);
        }
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  } catch (err) {
    console.log(err);
  }
}
//export this module
export default makeHttpRequest;
