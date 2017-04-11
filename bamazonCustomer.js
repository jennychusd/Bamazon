var mysql = require('mysql');
var prompt = require('prompt');

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
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i=0; i<res.length; i++) {
            if(res[i].stock_quantity>0) {
                console.log('ID: ' + res[i].item_id + ' | ' + res[i].product_name + ' | $' + res[i].price)
            }
        }
        buyProduct();
    })
}

function buyProduct() {
    prompt.get([{
        name: 'productID',
        description: 'Product ID you want to purchase',
        type: 'integer',
        required: true
    }, {
        name: 'quantity',
        description: 'Quantity you want like to purchase',
        type: 'integer',
        required: true
    }], function(err, res) {
        console.log(res);
        var purchaseID = res.productID;
        var purchaseQty = res.quantity;
        connection.query("SELECT * FROM products WHERE ?", {
            item_id: purchaseID
        }, function(err, res) {
            if (err) throw err;
            if(res[0].stock_quantity >= purchaseQty) {
                var stockQty = res[0].stock_quantity;
                var orderPrice = purchaseQty * res[0].price;
                var currentSales = res[0].products_sales;
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: stockQty - purchaseQty
                }, {
                    item_id: purchaseID
                }])
                console.log("Purchase successful, your total is $" + orderPrice);
                var newSales = currentSales + orderPrice;
                connection.query("UPDATE products SET ? WHERE ?", [{
                    products_sales: newSales
                }, {
                    item_id: purchaseID
                }])
            } else {
                console.log("Insufficient quantity");
            }
        });
    })
}

start();