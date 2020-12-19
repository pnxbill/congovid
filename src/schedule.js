const { downloadPdf } = require("./functions/downloadPdf");
const { getDownloadLink } = require("./functions/getDownloadLink");
const { pdfExtract } = require("./functions/pdfExtract");
const { resolvers } = require("./database/resolvers/informeResolver");
const mongoose = require("mongoose");
const config = require("./database/connection");
const fs = require("fs");

const connect = mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then(
  (db) => {
    console.log("Connected to db");
    routine();
  },
  (err) => {
    console.log(err);
  }
);

const routine = async () => {
  const { href, date } = await getDownloadLink();
  const filename = `Informe ${date}.pdf`;
  await downloadPdf(filename, href);

  const daily = {
    ...(await pdfExtract(filename)),
    href,
  };

  await resolvers.Mutation.addInforme("any", daily);
  console.log(daily);
  try {
    fs.unlinkSync(filename);
  } catch (err) {
    console.error(err);
  }
};
