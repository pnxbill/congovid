const cron = require("node-cron");
const express = require("express");

const { getDownloadLink } = require('./functions/getDownloadLink');
const { pdfExtract } = require('./functions/pdfExtract');
const { downloadPdf } = require('./functions/downloadPdf');

app = express();
app.listen(8080);

// cron.schedule("0 13 */1 * *", () => {
//   routine();
// });

cron.schedule("* * * * *", () => {
  routine();
});

const routine = async () => {
  const { href, date } = await getDownloadLink();
  const filename = `Informe ${date}.pdf`
  await downloadPdf(filename, href)
  // const filename = `Informe ${`02-12`}.pdf`
  const dailyInfo = await pdfExtract(filename)
  console.log(dailyInfo)
};