const request = require("request-promise-native");
const fs = require('fs');

exports.downloadPdf = async (outputFilename, pdfURL) => {
  let pdfBuffer = await request.get({ uri: pdfURL, encoding: null, strictSSL: false });
  console.log("Writing downloaded PDF file to " + outputFilename + "...");
  fs.writeFileSync(outputFilename, pdfBuffer);
}