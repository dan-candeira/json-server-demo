const fs = require("fs");
// biblioteca que gera valores aleatorios
const { faker } = require("@faker-js/faker");
let db;

module.exports = function (server, bodyParser) {
  try {
    db = require("./db.json");
  } catch (error) {
    // only will enter here if there is no db.json file
    const json = {
      data: Array.from(Array(10).keys()).map((index) => ({
        id: index,
        empresa: faker.company.name(),
        aluno: faker.name.fullName(),
        dataInicio: faker.date.between(),
        ativo: index % 2 == 0 ? true : false,
      })),
    };

    fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(json));
    db = require("./db.json");
  }

  server.get("/users", function (req, res) {
    data = db.data;

    // if users not found return error
    if (data.length == 0) {
      res.status(404).send("Not found");
    }

    res.jsonp(db.data);
  });

  server.get("/users/:id", function (req, res) {
    const id = req.params.id;

    const user = db.data.find((user) => user.id === Number(id));

    // if user not found return error
    if (!user) {
      res.status(404).jsonp({ error: "User not found" });
    }

    res.jsonp(user);
  });

  // To handle POST, PUT and PATCH you need to use a body-parser
  server.use(bodyParser);
  server.post("/users", function (req, res) {
    // create a new user
    const user = { id: db.data.length, ...req.body };
    // add user to db
    db.data.push(user);
    // overwrite db.json file
    fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(db));
    // return user to client
    res.status(201).jsonp(user);
  });

  server.use(bodyParser);
  server.put("/users/:id", function (req, res) {
    const id = req.params.id;

    // find user in db
    const user = db.data.find((user) => user.id === Number(id));

    // if user not found return error
    if (!user) {
      res.status(404).jsonp({ error: "User not found" });
    }

    // update user
    const updatedUser = { ...user, ...req.body };

    // update db
    const index = db.data.indexOf(user);

    // replace user data in db
    db.data[index] = updatedUser;

    // overwrite db.json file
    fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(db));

    // return user to client
    res.jsonp(updatedUser);
  });

  server.delete("/users/:id", function (req, res) {
    const id = req.params.id;

    // find user in db
    const user = db.data.find((user) => user.id === Number(id));

    // if user not found return error
    if (!user) {
      res.status(404).jsonp({ error: "User not found" });
    }

    // remove user from db
    db.data.splice(db.data.indexOf(user), 1);

    // overwrite db.json file
    fs.writeFileSync(`${__dirname}/db.json`, JSON.stringify(db));

    // return user to client
    res.status(204);
  });
};
