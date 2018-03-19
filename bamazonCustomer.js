var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "Bamazon_DB"
});



function promptUser() {
inquirer.prompt([
    {
        type: "input",
        name: "item_id",
        message: "Please enter the ID of the item you would like to purchase.",
        filter: Number
    },
    {
        type: "input",
        name: "quantity",
        message: "How much of this product do you want?",
        filter: Number
    }
]).then(function(input) {
    var item = input.item_id;
    var quantity = input.quantity;

    //confirm with database that ID exists
    var queryDB = 'SELECT * FROM products WHERE ?';

    connection.query(queryDB, {item_id: item}, function(err, data) {
        if (err) throw err;

        if (data.length === 0) {
            console.log('ERROR: Product ID does not exist');
            displayInventory();
        } else {
            var productData = data[0];

            if (quantity <= productData.stock_quantity) {
                console.log ("Placing order...");
                var updateQueryDB = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                connection.query(updateQueryDB, function(err, data) {
                    if (err) throw (err);

                    console.log('Your Order has been placed. Your total is $' + productData.price * quantity);
                    console.log('Thank you and come again soon!');
                    console.log("\n=============================================================\n");

                    connection.end();
                })
            } else {
                console.log("Sorry, this item is out of stock, or you chose more than what we have.");
                console.log("Please check again later");
                console.log("\n=============================================================\n");

                displayInventory();
            }
        }
    })
})

}

function displayInventory() {
    queryDB = ' SELECT * FROM products';

    connection.query(queryDB, function(err, data) {
        if (err) throw err;

        console.log('Current Inventory: ');
        console.log('......................\n');

        var DBOut = '';
        for (var i = 0; i < data.length; i++) {
            DBOut = '';
            DBOut += 'Item ID: ' + data[i].item_id + ' // ';
            DBOut += 'Product Name: ' + data[i].product_name + ' // ';
            DBOut += 'Department: ' + data[i].department_name + ' // ';
            DBOut += data[i].stock_quantity + ' // ';
            DBOut += 'Price: $' + data[i].price + '\n';

            console.log(DBOut);
        }
        console.log("=============================================================\n");

        promptUser();
    })
}

function runApp() {
    displayInventory();
}

runApp();