/**
 * Server.js
 * This is an example of a very basic Express server.
 * We'll use this server to expose the endpoints of our REST API.
 *
 * @author Andrew Roberts
 */

import express from "express";
import { PgClient } from "./PgClient";

// initialize our Express server
const app = express();
app.use(express.json());

// connect to our database
PgClient.connect(err => {
  if (err) {
    console.error("Not connected to the DB :-(", err.stack);
  } else {
    console.log("Connected to our DB.");
  }
});

// setup some endpoints
app.get("/account/:id", async (req, res) => {
  // headers
  res.set({
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json"
  });
  
  // query and send response
  const { id } = req.params;
  const { rows } = await PgClient.query(
    `SELECT * FROM account WHERE _id = ${id};`
  );
  res.send(rows[0]);
});

app.post("/account", async (req, res) => {
  // headers
  res.set({
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json"
  });

  // query and send response
  const { firstName, lastName, email } = req.body;
  if (firstName && lastName && email) {
    const { rows } = await PgClient.query(
      `INSERT INTO account (first_name, last_name, email) VALUES ('${firstName}', '${lastName}', '${email}') RETURNING _id;`
    );
    res.send(rows[0]);
  } else {
    res.json({
      error:
        "Invalid POST request.  Please include firstName, lastName, and email."
    });
  }
});

// run the server on port 3000
const PORT = 3000;
const HOST = "localhost";
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}...`);
