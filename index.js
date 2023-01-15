const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const generateTeam = require("./src/templateHTML");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
teamArray = [];
function runIndexJs() {
  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select an employee type:",
          name: "employeeType",
          choices: ["Manager", "Engineer", "Intern", "Finished"],
        },
      ])
      .then((response) => {
        if (response.employeeType === "Manager") {
          addManager();
        } else if (response.employeeType === "Engineer") {
          addEngineer();
        } else if (response.employeeType === "Intern") {
          addIntern();
        } else {
          writeHTML();
        }
      });
  }
  function addManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Manager's name:"
        },
        {
          type: "input",
          name: "id",
          message: "Manager's employee ID:"
        },
        {
          type: "input",
          name: "email",
          message: "Manager's email:"
        },
        {
          type: "input",
          name: "officeNumber",
          message: "Manager's office number:"
        }
      ])
      .then((response) => {
        const manager = new Manager(
          response.name,
          response.id,
          response.email,
          response.officeNumber
        );
        teamArray.push(manager);
        createTeam();
      });
  }
  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Engineer's name:"
        },
        {
          type: "input",
          name: "id",
          message: "Engineer's employee ID:"
        },
        {
          type: "input",
          name: "email",
          message: "Engineer's email:"
        },
        {
          type: "input",
          name: "github",
          message: "Engineer's GitHub username:"
        }
      ])
      .then((response) => {
        const engineer = new Engineer(
          response.name,
          response.id,
          response.email,
          response.github
        );
        teamArray.push(engineer);
        createTeam();
      });
  }
  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Intern's name:"
        },
        {
          type: "input",
          name: "id",
          message: "Intern's employee ID:"
        },
        {
          type: "input",
          name: "email",
          message: "Intern's email:"
        },
        {
          type: "input",
          name: "school",
          message: "Intern's school name:"
        }
      ])
      .then((response) => {
        const intern = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        teamArray.push(intern);
        createTeam();
      });
  }  
  function writeHTML() {
    console.log("Success!");
    fs.writeFileSync("./output/index.html", generateTeam(teamArray), "UTF-8");
  }
  createTeam();
}
runIndexJs();
