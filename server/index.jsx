import React from "react";
import {renderToString} from "react-dom/server";
import {MemoryRouter} from "react-router-dom";
import express from "express";
import cors from "cors";
import compression from "compression";
import {Sequelize, DataTypes} from "sequelize";
import {App} from "../client/app.jsx";

const database = new Sequelize("postgres://workspaces:workspaces@postgresql:5432/workspaces");

await database.authenticate();

const Users = database.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING
  }
});

await database.sync({force: true});

await Users.bulkCreate([
  {
    email: "johndoe@gmail.com"
  },
  {
    email: "janedoe@gmail.com"
  }
]);

const server = express();

server.use(cors({
  origin: "*"
}));

server.use(compression({
  level: 9
}));

server.use((request, response, next) => {
  if (request.url !== "/") {
    return next();
  }
}, express.static(process.env.NODE_ENV === "development" ? "../build/client" : "./build/client"));

server.get("/api/users", async (request, response) => {
  response.json(await Users.findAll());
});

server.all("*", (request, response) => {
  response.send(renderToString(
    <html lang="en-US">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="SEO Friendly" />
        <meta name="theme-color" content="#ffffff" />
        <title>App</title>
      </head>
      <body>
        <div id="root">
          <MemoryRouter initialEntries={[request.url]}>
            <App />
          </MemoryRouter>
        </div>
        <script src="./index.js"></script>
      </body>
    </html>
  ));
});

server.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log("Listening!");
});
