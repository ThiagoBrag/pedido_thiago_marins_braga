const express = require('express');
const router = express.Router();

const productsHandler = require('./Products.handler')

router.get("/", async (req, res) => {
    res.json(await productsHandler.procurarProducts())
})

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    res.json(await productsHandler.procurarProduct(id))
})

router.post("/", async (req, res) => {
    const dados = req.body;
    res.json(await productsHandler.criarProduct(dados));
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    res.json(await productsHandler.editarProduct(dados, id))
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await productsHandler.deletarProduct(id));
})

module.exports = router