const inquirer = require("inquirer");
const {
  viewEmployees,
  employeeByDept,
  employeeByManager,
  loadRoles,
  addNewEmployee,
  removeNewEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
} = require("../config/orm");
const cTable = require("console.table");
const connection = require("../config/connection");
let roles = [];
let employees = [];
let newEmployee = {};
let roleID;
let managerID;
let employeeID;

const mainMenu = () => {
  inquirer
    .prompt({
      name: "mainMenu",
      message: "What would you like to do?",
      type: "list",
      choices: [
        "View all employees",
        "View employees by department",
        "View employees by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "Exit",
      ],
    })
    .then((res) => {
      switch (res.mainMenu) {
        case "Exit":
          connection.end();
          process.exit();
        case "View all employees":
          viewEmployees().then((res) => {
            console.table(res);
            mainMenu();
          });
          break;
        case "View employees by department":
          employeeByDept().then((res) => {
            console.table(res);
            mainMenu();
          });
          break;
        case "View employees by manager":
          employeeByManager().then((res) => {
            console.table(res);
            mainMenu();
          });
          break;
        case "Add employee":
          addEmployee().then((res) => {
            console.log(res);
            mainMenu();
          });
          break;
        case "Remove employee":
          removeEmployee().then((res) => {
            console.log(res);
            mainMenu();
          });
          break;
        case "Update employee role":
          updateRole().then((res) => {
            console.log(res);
            mainMenu();
          });
          break;
        case "Update employee manager":
          updateManager().then((res) => {
            console.log(res);
            mainMenu();
          });
          break;
      }
    });
};

const removeEmployee = () => {
  employees = [];
  return new Promise((resolve, reject) => {
    viewEmployees()
      .then((res) => {
        res.forEach((el) => {
          employees.push(el.full_name);
        });
      })
      .then(() => {
        inquirer
          .prompt([
            {
              name: "employee",
              type: "list",
              message: "Which employee you want to remove?",
              choices: employees,
            },
          ])
          .then((res) => {
            viewEmployees()
              .then((data) => {
                data.forEach((element) => {
                  if (res.employee === element.full_name) {
                    employeeID = element.id;
                  }
                });
              })
              .then(() => {
                removeNewEmployee(employeeID).then((resp) => resolve(resp));
              });
          });
      })
      .catch((err) => {
        if (err) reject(err);
      });
  });
};

const addEmployee = () => {
  employees = [];
  roles = [];
  return new Promise((resolve, reject) => {
    loadRoles()
      .then((res) => {
        res.forEach((element) => {
          roles.push(element.title);
        });
      })
      .then(() => {
        viewEmployees()
          .then((res) => {
            res.forEach((el) => {
              employees.push(el.full_name);
            });
          })
          .then(() => {
            inquirer
              .prompt([
                {
                  name: "fName",
                  type: "input",
                  message: "What is the first name of the employee?",
                },
                {
                  name: "lName",
                  type: "input",
                  message: "What is the last name of the employee?",
                },
                {
                  name: "role",
                  type: "list",
                  message: "What is the role of the employee?",
                  choices: roles,
                },
                {
                  name: "manager",
                  type: "list",
                  message: "What is the name of the manager?",
                  choices: employees,
                },
              ])
              .then((res) => {
                viewEmployees()
                  .then((data) => {
                    data.forEach((element) => {
                      if (res.role === element.title) {
                        roleID = element.role_id;
                      }
                      if (res.manager === element.full_name) {
                        managerID = element.id;
                      } else if (res.manager === "None") {
                        managerID = null;
                      }
                    });
                  })
                  .then(() => {
                    newEmployee = {
                      first_name: res.fName,
                      last_name: res.lName,
                      role_id: roleID,
                      manager_id: managerID,
                    };
                    return newEmployee;
                  })
                  .then((obj) => {
                    addNewEmployee(obj).then((resp) => resolve(resp));
                  });
              });
          });
      })
      .catch((err) => {
        if (err) reject(err);
      });
  });
};

const updateRole = () => {
  employees = [];
  roles = [];
  return new Promise((resolve, reject) => {
    loadRoles()
      .then((res) => {
        res.forEach((element) => {
          roles.push(element.title);
        });
      })
      .then(() => {
        viewEmployees()
          .then((res) => {
            res.forEach((el) => {
              employees.push(el.full_name);
            });
          })
          .then(() => {
            inquirer
              .prompt([
                {
                  name: "employee",
                  type: "list",
                  message: "Which employee's role you want to update?",
                  choices: employees,
                },
                {
                  name: "role",
                  type: "list",
                  message: "What is the new role of the employee?",
                  choices: roles,
                },
              ])
              .then((res) => {
                viewEmployees()
                  .then((data) => {
                    data.forEach((element) => {
                      if (res.role === element.title) {
                        roleID = element.role_id;
                      }
                      if (res.employee === element.full_name) {
                        employeeID = element.id;
                      } else if (res.manager === "None") {
                        employeeID = null;
                      }
                    });
                  })
                  .then(() => {
                    updateEmployeeRole(employeeID, roleID).then((resp) =>
                      resolve(resp)
                    );
                  });
              });
          });
      })
      .catch((err) => {
        if (err) reject(err);
      });
  });
};

const updateManager = () => {
  employees = [];
  return new Promise((resolve, reject) => {
    viewEmployees()
      .then((res) => {
        res.forEach((el) => {
          employees.push(el.full_name);
        });
      })
      .then(() => {
        inquirer
          .prompt([
            {
              name: "employee",
              type: "list",
              message: "Which employee you want to update?",
              choices: employees,
            },
            {
              name: "manager",
              type: "list",
              message: "Who is the new manager of the employee?",
              choices: employees,
            },
          ])
          .then((res) => {
            viewEmployees()
              .then((data) => {
                data.forEach((element) => {
                  if (res.manager === element.full_name) {
                    managerID = element.id;
                  }
                  if (res.employee === element.full_name) {
                    employeeID = element.id;
                  } else if (res.manager === "None") {
                    employeeID = null;
                  }
                });
              })
              .then(() => {
                updateEmployeeManager(employeeID, managerID).then((resp) =>
                  resolve(resp)
                );
              });
          });
      })
      .catch((err) => {
        if (err) reject(err);
      });
  });
};

module.exports = mainMenu;
