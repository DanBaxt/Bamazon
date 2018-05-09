CREATE DATABASE Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL (10,2) NOT NULL,
stock_quantity INTEGER(11) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pepsi Cola 1893", "Grocery", 17.00, 10),
		("Under Armour Duffle Bag", "Sports", 39.99, 10),
        ("Detective Pikachu Amiibo", "Videogames", 29.99, 10),
        ("Lumos Smart Bike Helmet", "Outdoors", 179.99, 10),
        ("A Wrinkle In Time", "Books", 5.10, 10),
        ("Playstation 4 Slim", "Videogames", 299.99, 10),
        ("LoRan Knitting Thimble", "Crafts", 2.45, 10),
        ("Sony Noise Cancelling Headphones", "Electronics", 348.00, 10),
        ("Echo Dot", "Electronics", 50.00, 10),
        ("Band Aid", "Pharmacy", 3.25, 10);
        
SELECT * FROM products;