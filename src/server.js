const express = require("express");
const mongoose = require("mongoose");
const { typeDefs } = require("./database/schemas/informeSchema");
const { resolvers } = require("./database/resolvers/informeResolver");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const config = require("./database/connection");
const routes = require("./routes");
const path = require("path");

const connect = mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then(
  (db) => {
    console.log("Connected to db");
  },
  (err) => {
    console.log(err);
  }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

app = express();
app.use("*", cors());
app.use(routes);
app.use(express.static(path.join(__dirname, "build")));
server.applyMiddleware({ app });

const PORT = process.env.PORT || 8000;

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`)
);

// cron.schedule("0 14 */1 * *", () => {
//   routine();
// }, {scheduled : true, timezone: "America/Sao_Paulo"});
