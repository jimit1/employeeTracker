const connection = require("./connection");

const viewEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT
    e.id id,
    e.first_name,
    e.last_name,
    CONCAT_WS(" ", e.first_name, e.last_name) full_name,
    role.id role_id,
    role.title,
    department.name,
    role.salary,
    CONCAT_WS(" ", m.first_name, m.last_name) manager
FROM
    employee e
LEFT JOIN employee m ON m.id = e.manager_id
LEFT JOIN role ON e.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
ORDER BY e.id;`,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const employeeByDept = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT employee.id, first_name, last_name, title, department.name
    FROM employee LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id
    ORDER BY department.id ASC;`,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const employeeByManager = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT
      CONCAT_WS(" ", m.first_name, m.last_name) manager,
    CONCAT_WS(" ", e.first_name, e.last_name) employee 
FROM
    employee e
INNER JOIN employee m ON e.manager_id = m.id
ORDER BY
    manager ASC;`,
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const loadRoles = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM role;`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const addNewEmployee = (obj) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO employee SET ?`, [obj], (err) => {
      if (err) {
        reject(err);
      }
      resolve({ msg: "success" });
    });
  });
};

const removeNewEmployee = (empId) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM employee WHERE ?`, [{ id: empId }], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ msg: "success" });
      }
    });
  });
};

const updateEmployeeRole = (empId, roleId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE employee SET ? WHERE ?`,
      [{ role_id: roleId }, { id: empId }],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ msg: "success" });
        }
      }
    );
  });
};

const updateEmployeeManager = (empId, managerId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE employee SET ? WHERE ?`,
      [{ manager_id: managerId }, { id: empId }],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ msg: "success" });
        }
      }
    );
  });
};

module.exports = {
  viewEmployees,
  employeeByDept,
  employeeByManager,
  loadRoles,
  addNewEmployee,
  removeNewEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
};
