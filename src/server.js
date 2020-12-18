// const cron = require("node-cron");
// const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const { typeDefs } = require('./database/schemas/informeSchema');
const { resolvers } = require('./database/resolvers/informeResolver');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const config = require('./database/connection')
const routes = require('./routes');

// const { getDownloadLink } = require('./functions/getDownloadLink');
// const { pdfExtract } = require('./functions/pdfExtract');
// const { downloadPdf } = require('./functions/downloadPdf');

const connect = mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connect.then((db) => {
  console.log('Connected to db');
}, (err) => {
  console.log(err);
});

const server = new ApolloServer({
  typeDefs,
  resolvers
});

app = express();
app.use('*', cors());
app.use(routes)
server.applyMiddleware({ app });

const PORT = process.env.PORT || 8000;

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`));



// cron.schedule("0 14 */1 * *", () => {
//   routine();
// }, {scheduled : true, timezone: "America/Sao_Paulo"});

// cron.schedule("* * * * *", () => {
//   routine();
// });

// const routine = async () => {
//   const { href, date } = await getDownloadLink();
//   const filename = `Informe ${date}.pdf`
//   await downloadPdf(filename, href)
//   // const filename = `Informe ${`02-12`}.pdf`
//   // const dailyInfo = await pdfExtract(filename)
//   const daily = {
//     ...await pdfExtract(filename),
//     href
//   }
//   await resolvers.Mutation.addInforme('any', daily)
//   console.log(daily)
//   try {
//     fs.unlinkSync(filename)
//     //file removed
//   } catch(err) {
//     console.error(err)
//   }
// };