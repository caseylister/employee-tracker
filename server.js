const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection({
  host: "localhost",
  // Your MySQL username,
  user: process.env.DB_USER,
  // Your MySQL password
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log(`Company database connected.`);

  startApp();
});


