const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

//  services
const sample = require("./sample-service/index.js");

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// component services
sample(server, jsonServer.bodyParser);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
