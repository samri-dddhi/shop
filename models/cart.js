// const fs= require('fs');
// const path= require('path');

// const p= path.join(
//     path.dirname(require.main.filename),
//     'data',
//     'cart.json'
// );

// module.exports = class Cart {
//     static addProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//         let cart = { products: [], totalPrice: 0 };
//         if (!err) {
//             cart = JSON.parse(fileContent);
//         }
//         const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
//         const existingProduct = cart.products[existingProductIndex];
//         let updatedProduct;
//         if (existingProduct) {
//             updatedProduct = { ...existingProduct };
//             updatedProduct.qty = updatedProduct.qty + 1;
//             cart.products = [...cart.products];
//             cart.products[existingProductIndex] = updatedProduct;
//         } else {
//             updatedProduct = { id: id, qty: 1 };
//             cart.products = [...cart.products, updatedProduct];
//         }
//         cart.totalPrice = cart.totalPrice + +productPrice;
//         fs.writeFile(p, JSON.stringify(cart), err => {
//             console.log(err);
//         });
//     });
// }

// static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             return;
//         }
//         const cart = JSON.parse(fileContent);
//         const updatedProducts = cart.products.filter(prod => prod.id !== id);
//         const product = cart.products.find(prod => prod.id === id);
//         if (product) {
//             cart.totalPrice = cart.totalPrice - productPrice;
//         }
//         cart.products = updatedProducts;
//         fs.writeFile(p, JSON.stringify(cart), err => {
//             console.log(err);
//         });
//     });
// };
//     static getCart(cb) {
//         fs.readFile(p, (err, fileContent) => {
//             if (err) {
//                 return cb(null);
//             }
//             cb(JSON.parse(fileContent));
//         });
//     }
// };

const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

module.exports = Cart;