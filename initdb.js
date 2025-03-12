const sqlite = require("better-sqlite3");

const db = sqlite('products.sqlite');

db.prepare(
    `DROP TABLE products`
).run()

db.prepare(
    `CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        image TEXT
    )`
).run()



db.prepare(
    `INSERT INTO products(name, price, image) VALUES('Apple', 30, 'apple.jpeg')`
).run()

db.prepare(
    `INSERT INTO products(name, price, image) VALUES('Orange', 40, 'orange.jpeg')`
).run()

db.prepare(
    `INSERT INTO products(name, price, image) VALUES('Banana', 20, 'banana.jpeg')`
).run()


const products = db.prepare(
    `SELECT * FROM products`
).all()

console.log(products);