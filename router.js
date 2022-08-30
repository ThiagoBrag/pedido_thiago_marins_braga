const express = require('express');
const router = express.Router();

const Users = require("./api/Users/Users.controller");
const Orders = require("./api/Orders/Orders.controller");
const OrderProducts = require("./api/OrderProducts/OrderProducts.controller");
const Products = require("./api/Products/Products.controller");

router.use("/users",Users);
router.use("/orders",Orders);
router.use("/orderproducts",OrderProducts);
router.use("/products",Products);


module.exports = router;