//const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const CartItem = require('./models/cart-item');
const Cart = require('./models/cart');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); 

//const adminData = require('./routes/admin');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result[0]);
// })
// .catch(err => {
//     console.log(err);
// }); 

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });
});

//app.use('/admin',adminData.routes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
.sync({ force: true }) // This will drop the table and create a new one
//.sync()
.then(result => {
    return User.findByPk(1);
    //console.log(result);
   })
.then(user => {
    if(!user) {
        return User.create({ name: 'Max', email: 'max@example.com' });
    }
    return user;    
})
.then(user => {
   // console.log(user);
    return user.createCart();
  
})
.then(cart => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});
