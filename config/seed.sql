DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

-- Seeding the db

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jim", "Mehta", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ashley", "Rodriguez", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 5, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Malia", "Brown", 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Sarah", "Lourd", 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 8, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tammer", "Galal", 9, 2);



INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Head of Demand Generation", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Lead", 100000, 2);



INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

-- view all todos
SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;
SELECT first_name, id FROM employee WHERE id = 2;

-- update todos
UPDATE employee 
SET manager_id = 7
WHERE id = 8;


-- delete a todo
DELETE FROM employee WHERE id = 3;


-- View employees by department
SELECT employee.id, first_name, last_name, title, department.name
FROM employee LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
ORDER BY department.id ASC;

-- View Employees by Manager
SELECT
    CONCAT_WS(" ", e.first_name, e.last_name) employee,
    CONCAT_WS(" ", m.first_name, m.last_name) manager
FROM
    employee e
LEFT JOIN employee m ON m.id = e.manager_id
ORDER BY
    manager DESC;


-- View all Employees
SELECT
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
ORDER BY e.id;