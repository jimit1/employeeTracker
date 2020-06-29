const connection = require("./config/connection");
const mainMenu = require("./prompts/prompt");

connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});
