const express = require('express');
const tasks = require('./routes/tasks');
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file
const app = express();
const fs = require('fs');
const port = process.env.PORT || 5000;
const config = require('./config')
const cors = require("cors");

app.use(express.json());  
app.use('/api/v1', tasks);
app.use(cors());

const pool = mysql.createPool({ host: config.mysqlHost, user: config.user, password: config.password, database: config.database, port: config.mysqlPort });

const makePromise = pool.promise();

// // Use the connection pool for queries
const result = makePromise.query("select * from notes")
console.log("Successfully Connected to the database!")
console.log(result)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
