const express = require('express');
const router = express.Router();

const orderProductsHandler = require('./OrderProducts.handler')

router.get("/", async (req, res) => {
    res.json(await orderProductsHandler.procurarOrderProduct())
})

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    res.json(await orderProductsHandler.procurarOrderProduct(id))
})

router.post("/", async (req, res) => {
    const dados = req.body;
    res.json(await orderProductsHandler.criarOrderProduct(dados));
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    res.json(await orderProductsHandler.editarOrderProduct(dados, id))
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await orderProductsHandler.deletarOrderProduct(id));
})

router.put("/:id/:idProduct", async (req, res) => {
    const id = req.params.id;
    const idProduct = req.params.idProduct;
    const dados = req.body;
    res.json(await orderProductsHandler.deletarProduct(id, idProduct, dados));
})

module.exports = router