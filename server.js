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

// View Employees
function viewEmployee() {
    console.log("Viewing employees... \n");
  
    const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                  FROM employees e
                  LEFT JOIN roles r
                  ON e.role_id = r.id
                  LEFT JOIN departments d
                  ON d.id = r.department_id
                  LEFT JOIN employees m
                  ON m.id = e.manager_id`;
  
    db.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      console.log("Employees viewed! \n");
  
      startApp();
    });
  }


// Display list of departments for user to choose
function viewEmployeeByDept() {
    console.log("Viewing employees by department\n");
  
    var query = `SELECT d.id, d.name, r.salary AS budget
          FROM employees e
          LEFT JOIN roles r
          ON e.role_id = r.id
          LEFT JOIN departments d
          ON d.id = r.department_id`;
  
    db.query(query, function (err, res) {
      if (err) throw err;
  
      const deptChoices = res.map((data) => ({
        value: data.id,
        name: data.name,
      }));
  
      console.table(res);
      console.log("Viewing departments... \n");
  
      chosenDepartment(deptChoices);
    });
  }

  // View employees by chosen department
  function chosenDepartment(deptChoices) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Choose a department to view its employees.",
          choices: deptChoices,
        },
      ])
      .then(function (answer) {
        var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
              FROM employees e
              JOIN roles r
              ON e.role_id = r.id
              JOIN departments d
              ON d.id = r.department_id
              WHERE d.id = ?`;
  
        db.query(query, answer.departmentId, function (err, res) {
          if (err) throw err;
          console.table("response ", res);
  
          console.log("Employees viewed! \n");
  
          startApp();
        });
      });
  }