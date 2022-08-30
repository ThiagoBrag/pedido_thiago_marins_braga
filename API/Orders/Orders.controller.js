const express = require('express');
const router = express.Router();

const ordersHandler = require('./Orders.handler')

router.get("/", async (req, res) => {
    res.json(await ordersHandler.procurarOrders())
})

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    res.json(await ordersHandler.procurarOrder(id))
})

router.post("/", async (req, res) => {
    const dados = req.body;
    res.json(await ordersHandler.criarOrder(dados));
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    res.json(await ordersHandler.editarOrder(dados, id))
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await ordersHandler.deletarOrder(id));
})

module.exports = router