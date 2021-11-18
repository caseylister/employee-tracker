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


// Prompt user for action
function startApp() {
    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
          "View Employees",
          "View Employees by Department",
          "View Departments",
          "View Roles",
          "Add an Employee",
          "Add a Department",
          "Add a Role",
          "Update Employee Role",
          "Remove an Employee",
          "Finish!",
        ],
      })
      .then(function ({ task }) {
        console.log("You chose to: " + task);
        switch (task) {
          case "View Employees":
            viewEmployee();
            break;
  
          case "View Employees by Department":
            viewEmployeeByDept();
            break;
  
          case "View Departments":
            viewDept();
            break;
  
          case "View Roles":
            viewRoles();
            break;
  
          case "Add an Employee":
            addEmployee();
            break;
  
          case "Add a Department":
            addDept();
            break;
  
          case "Add a Role":
            addRole();
            break;
  
          case "Update Employee Role":
            updateRole();
            break;
  
          case "Remove an Employee":
            deleteEmployee();
            break;
  
          case "Finish!":
            db.end();
            break;
        }
      });
  }