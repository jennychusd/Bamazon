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
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function(answer) {
        actionRouter(answer.menuOptions);
    })
};

function actionRouter(userAction) {
    switch(userAction) {
        case 'View Products for Sale':
            viewProducts();
            break;
        case 'View Low Inventory':
            lowInventory();
            break;
        case 'Add to Inventory':
            addInventory();
            break;
        case 'Add New Product':
            newProduct();
            break;
        default:
            console.log("Choose a valid command");
    }
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i=0; i<res.length; i++) {
            if(res[i].stock_quantity>0) {
                console.log('ID: ' + res[i].item_id + ' | ' + res[i].product_name + ' | $' + res[i].price + ' | Quantity in stock: ' + res[i].stock_quantity);
            }
        }
    })
};

function lowInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i=0; i<res.length; i++) {
            if(res[i].stock_quantity>0 && res[i].stock_quantity<5) {
                console.log('ID: ' + res[i].item_id + ' | ' + res[i].product_name + ' | $' + res[i].price + ' | Quantity in stock: ' + res[i].stock_quantity);
            }
        }
    })
};

function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i=0; i<res.length; i++) {
            console.log('ID: ' + res[i].item_id + ' | ' + res[i].product_name + ' | $' + res[i].price + ' | Quantity in stock: ' + res[i].stock_quantity);
        };
        prompt.get([{
        name: 'productID',
        description: 'Product ID you want to add inventory for',
        type: 'integer',
        required: true
    }, {
        name: 'quantity',
        description: 'Quantity you want like to add',
        type: 'integer',
        required: true
    }], function(err, res) {
        var purchaseID = res.productID;
        var purchaseQty = res.quantity;
        connection.query("SELECT * FROM products WHERE ?", {
            item_id: purchaseID
        }, function(err, res) {
            var stockQty = res[0].stock_quantity;
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: stockQty + purchaseQty
            }, {
                item_id: purchaseID
            }])
            console.log(res[0].product_name + ' stocked to ' + (stockQty+purchaseQty));
        })
    })
    });
    
};

function newProduct() {
    prompt.get([{
        name: "productName",
        description: "What product to add",
        type: "string",
        required: true
    }, {
        name: "departmentName",
        description: "What department does the item go",
        type: "string",
        required: true
    }, {
        name: "price",
        description: "What is the price of the item",
        type: "number",
        required: true
    }, {
        name: "quantity",
        description: "What is stock quantity",
        type: "integer",
        required: true
    }], function(err, res) {
        var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + res.productName + "', '" + res.departmentName+ "', " + res.price + ", " + res.quantity + ")";
        connection.query(query, function(err, res) {
            console.log("New product added")
        })
    }
)};

start();