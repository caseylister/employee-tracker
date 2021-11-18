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

// View Departments
function viewDept() {
    console.log("Viewing departments... \n");
  
    const query = `SELECT * FROM departments`;
  
    db.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      console.log("Departments viewed! \n");
  
      startApp();
    });
}
  
// View Roles
function viewRoles() {
    console.log("Viewing roles... \n");
  
    const query = `SELECT * FROM roles`;
  
    db.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      console.log("Roles viewed! \n");
  
      startApp();
    });
}

// Show roles for role id prompt when adding employee
function addEmployee() {
    console.log("Adding an employee... \n");
  
    var query = `SELECT r.id, r.title, r.salary 
          FROM roles r`;
  
    db.query(query, function (err, res) {
      if (err) throw err;
  
      const roleOptions = res.map(({ id, title, salary }) => ({
        value: id,
        title: `${title}`,
        salary: `${salary}`,
      }));
  
      console.table(res);
  
      newEmployee(roleOptions);
    });
  }
  
// Add employee
function newEmployee(roleOptions) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleOptions,
        },
        {
            type: "input",
            name: "managerId",
            message: "What is this employee's manager's ID number?",
        }
      ])
      .then(function (answer) {
        var query = `INSERT INTO employees SET ?`;
        db.query(
          query,
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId,
          },
          function (err, res) {
            if (err) throw err;
            console.table(res);
  
            console.log("Employee added! \n");
  
            startApp();
          }
        );
      });
}

// Add a Department
function addDept() {
    const query = `INSERT INTO departments (name) VALUES (?)`;
    inquirer
      .prompt({
        type: "input",
        name: "deptName",
        message: "What is the name of the department?",
      })
      .then(function (answer) {
        db.query(query, [answer.deptName], function (err, res) {
          if (err) throw err;
          console.table(res);
  
          console.log("Department added! \n");
  
          startApp();
        });
      });
}

// Add Roles
function addRole() {
    const query = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of this role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the annual salary for this role?",
        },
        {
          type: "input",
          name: "deptId",
          message:
            "What department is this role for? Please enter the department ID number.",
        },
      ])
      .then(function (answer) {
        db.query(query, [answer.title, answer.salary, answer.deptId], function (
          err,
          res
        ) {
          if (err) throw err;
          console.table(res);
  
          console.log("Role added! \n");
  
          startApp();
        });
      });
  }
  

  // Update Employee Role
  function updateRole() {
    const query = `UPDATE employees SET role_id = ? WHERE first_name = ?`;
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message:
            "Which employee would you like to update? (Please enter employee's first name.",
        },
        {
          type: "number",
          name: "roleId",
          message: "Enter new employee role ID number.",
        },
      ])
      .then(function (answer) {
        db.query(query, [answer.roleId, answer.name], function (err, res) {
          if (err) throw err;
          console.table(res);
  
          console.log("Employee role updated! \n");
  
          startApp();
        });
      });
  }
  
// Create list of employees for user to choose from
function deleteEmployee() {
    console.log("Deleting an employee... \n");
  
    var query = `SELECT e.id, e.first_name, e.last_name
          FROM employees e`;
  
    db.query(query, function (err, res) {
      if (err) throw err;
  
      const deleteEmployeeOptions = res.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${id} ${first_name} ${last_name}`,
      }));
  
      console.table(res);
  
      chooseDelete(deleteEmployeeOptions);
    });
}

// Prompt user with employee list
// Delete an Employee
function chooseDelete(deleteEmployeeOptions) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee do you want to remove?",
          choices: deleteEmployeeOptions,
        },
      ])
      .then(function (answer) {
        var query = `DELETE FROM employees WHERE ?`;
  
        db.query(query, { id: answer.employee }, function (err, res) {
          if (err) throw err;
  
          console.table(res);
          console.log("Employee deleted! \n");
  
          startApp();
        });
      });
}
