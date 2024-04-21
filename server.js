const express = require("express");
const { MongoClient } = require("mongodb");

const connectionStringURI = `mongodb://127.0.0.1:27017`;
const dbName = "socialmediaDB";

const client = new MongoClient(connectionStringURI);

let db;

const app = express();
const port = 3001;

client
  .connect()
  .then(() => {
    console.log("Connected successfully to MongoDB");
    db = client.db(dbName);

    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Mongo connection error: ", error.message);
  });

app.use(express.json());
