const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// create database for new employees and team
const teamDb = []

// begins the questions


// starts the funciton and asked for first question
const start = () => {
    inquirer
        .prompt(
            {
                type: "list",
                message: "What is the employee's role?",
                name: 'role',
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ]
            }
        )
        // picks the next question based on the response below
        .then(res => {
            switch (res.role) {
                case 'Manager':
                    newManager();
                    break;
                case 'Engineer':
                    newEngineer();
                    break;
                case 'Intern':
                    newIntern();
                    break;
            }
        });

}
// ensure users enter all quetions, and blocks are users from not doing so
const validateInput = (input) => {
    if (!input) {
        return false;
    } else {
        return true;
    }
}

// asking questions 
const newManager = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is employee's name?",
                name: 'name',
                validate: validateInput
            }, {
                type: 'input',
                message: "What is the employee ID number?",
                name: 'id',
                validate: validateInput,

            }, {
                type: 'input',
                message: "What is your email?",
                name: 'email',
                validate: validateInput,
            }, {
                type: 'number',
                name: 'officeNumber',
                message: 'What is their office number?',
                validate: validateInput,
            }
        ])
        .then(res => {

            const createManager = new Manager(
                res.name,
                res.id,
                res.email,
                res.officeNumber,

            );
            teamDb.push(createManager);
            //display creation of
            console.log(`You have created ${res.name} as a new Manager!`);

            finishTeam();
        });
};

// asking questions for the enginner 
const newEngineer = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is employees name?',
                validate: validateInput
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter employee id:',
                validate: validateInput
            }, {
                type: 'input',
                name: 'email',
                message: 'add valid work email',
                validate: validateInput
            }, {
                type: 'input',
                name: 'github',
                message: 'what is employee github username?',
                validate: validateInput
            }
        ])
        .then(res => {
            const createEngineer = new Engineer(
                res.name,
                res.id,
                res.email,
                res.github,
            );

            teamDb.push(createEngineer);
            // confirm the additon of new enginner
            console.log(`You have queued ${res.name} as a new Enginner!`);

            finishTeam();
        });
};

// asking questions for the intern
const newIntern = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the Intern's name?",
                name: 'name',
                validate: validateInput
            }, {
                type: 'input',
                message: "What is the interns ID number?",
                name: 'id',
                validate: validateInput,

            }, {
                type: 'input',
                message: "What is the interns company email?",
                name: 'email',
                validate: validateInput,
            }, {
                type: 'input',
                name: 'school',
                message: 'What school does he/she  attend?',
                validate: validateInput,
            }
        ])
        .then(res => {
            const createIntern = new Intern(
                res.name,
                res.id,
                res.email,
                res.school
            );

            teamDb.push(createIntern);

            // display the creation of the intern
            console.log(`You have created ${res.name} as a new Intern!`);

            finishTeam();
        });

};

// last steps to finish the questionaire and create the HTML
// if finished the HTML will get created
// if needed at add another teammember will go through the loop again
const finishTeam = () => {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'nextSteps',
                message: 'Would you like to add another employee or stop?',
                choices: [
                    'Add another member',
                    'Finished'
                ]
            }).then(function (userResponse) {
                if (userResponse.nextSteps === 'Add another member') {
                    start()
                } else {
                    const employeeHTML = render(teamDb)
                    fs.writeFile(outputPath, employeeHTML, function () {  
                        // show file has been created in the console
                        console.log("you have succesful created a file")

                    })
                }
            })
        };

// begins the questions for new employees
start()
        




        