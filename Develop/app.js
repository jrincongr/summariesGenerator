const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "What Type of Employee are we adding?",
            choices: ["Manager", "Engineer", "Intern", "No more"],
            name: "empType"
        }
    ]).then(firstQ => {
        if (firstQ.empType !== "No more") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What's your new Employee's name?",
                    name: "empName"
                },
                {
                    type: "input",
                    message: "What's their Employee ID?",
                    name: "empID"
                },
                {
                    type: "input",
                    message: "What's their Employee Email?",
                    name: "empEmail"
                }
            ]).then(secondQ => {
                if (firstQ.empType == "Manager") {
                    inquirer.prompt([
                        {
                            message: "What's your Manager Office Number",
                            name: "empOffice"
                        }
                    ]).then(thirdQ => {
                        const managerObj = new Manager(secondQ.empName, secondQ.empID, secondQ.empEmail, thirdQ.empOffice);
                        employees.push(managerObj);
                        start()
                    })
                } else if (firstQ.empType == "Engineer") {
                    inquirer.prompt([
                        {
                            message: "What's your Engineer's Github Account?",
                            name: "empGithub"
                        }
                    ]).then(thirdQ => {
                        const engineerObj = new Engineer(secondQ.empName, secondQ.empID, secondQ.empEmail, thirdQ.empGithub);
                        employees.push(engineerObj);
                        start()
                    })
                } else if (firstQ.empType == "Intern") {
                    inquirer.prompt([
                        {
                            message: "What's your Intern's school?",
                            name: "empSchool"
                        }
                    ]).then(thirdQ => {
                        const internObj = new Intern(secondQ.empName, secondQ.empID, secondQ.empEmail, thirdQ.empSchool);
                        employees.push(internObj);
                        start()
                    })
                }
            })
        } else {
            fs.writeFile(outputPath, render(employees), err => {
                if (err) throw err
                console.log("Thank you for using my App!")
            })
        }
    })
}

start();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
