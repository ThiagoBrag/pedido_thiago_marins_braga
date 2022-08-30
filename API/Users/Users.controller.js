const express = require('express');
const router = express.Router();

const usersHandler = require('./Users.handler')

router.get("/", async (req, res) => {
    res.json(await usersHandler.procurarUsers())
})

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    res.json(await usersHandler.procurarUser(id))
})

router.post("/", async (req, res) => {
    const dados = req.body;
    res.json(await usersHandler.criarUser(dados));
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const dados = req.body;
    res.json(await usersHandler.editarUser(dados, id))
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await usersHandler.deletarUser(id));
})

module.exports = router