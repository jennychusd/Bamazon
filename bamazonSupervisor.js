var mysql = require('mysql');
var prompt = require('prompt');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "Bamazon",
});

connection.connect(function(err) {
	if(err) throw err;
});

function start() {
    inquirer.prompt([{
        name: "menuOptions",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
    }]).then(function(answer) {
        actionRouter(answer.menuOptions);
    })
};

function actionRouter(userAction) {
    switch(userAction) {
        case 'View Product Sales by Department':
            viewSalesByDept();
            break;
        case 'Create New Department':
            createDept();
            break;
        default:
            console.log("Choose a valid command");
    }
}

function viewSalesByDept() {

}

function createDept() {
    
}

start();