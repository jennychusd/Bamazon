CREATE database Bamazon;
USE Bamazon;

CREATE TABLE products (
	item_id INT auto_increment NOT NULL primary key,
    product_name VARCHAR(144) NOT NULL,
    department_name VARCHAR(32) NOT NULL,
    price DECIMAL (6,2) NOT NULL,
    stock_quantity INT(4) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Windex", "Household", 9.47, 34),
("The Nightingale", "Book", 15.76, 14),
("Kong Dog Toy", "Pet", 7.05, 67),
("Hydroflask", "Outdoors", 42.95, 26),
("Mario Kart 7", "Games", 19.99, 12),
("Harry Potter Collection", "Movies", 49.99, 7),
("Catan", "Games", 27.47, 56),
("Roomba", "Industrial", 324, 3),
("Charcoal Mask", "Beauty", 7.98, 29),
("Birkenstock Sandals", "Shoes", 99.95, 17);

CREATE TABLE departments (
	department_id INT auto_increment NOT NULL primary key,
    department_name VARCHAR(32) NOT NULL,
    overhead_cost DECIMAL (6, 2) NOT NULL,
    total_sales DECIMAL (7,2) NOT NULL
);

INSERT INTO departments (department_name, overhead_cost, total_sales)
VALUES ("Household", 19.68, 0),
("Book", 2.99, 0),
("Pet", 3.00, 0),
("Outdoors", 9.50, 0),
("Games", 5.92, 0),
("Movies", 8.01, 0),
("Industrial", 14.95, 0),
("Beauty", 0.99, 0),
("Shoes", 5.15, 0);

SELECT * FROM departments;

SELECT * FROM products;

DESC products;

ALTER TABLE products ADD products_sales DECIMAL(7,2) NOT NULL DEFAULT 0;

